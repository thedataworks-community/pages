import qrcode
from PIL import Image, ImageDraw, ImageFont

# -----------------------------
# 1. vCard Data
# -----------------------------
vcard_data = """BEGIN:VCARD
VERSION:3.0
N:Wilkins;Brek;;;Ph.D.
FN:Brek Wilkins, Ph.D.
ORG:DataWorks
TITLE:Co-Founder, Partner
TEL;TYPE=WORK,VOICE:+14056125995
EMAIL:brek@thedataworks.org
URL:https://thedataworks.org
NOTE:Structured Intelligence for Complex Data — powered by DataWorks.
END:VCARD
"""

# -----------------------------
# 2. Generate QR Code (white on DataWorks blue)
# -----------------------------
qr = qrcode.QRCode(
	error_correction=qrcode.constants.ERROR_CORRECT_H,
	box_size=20,  # already high-res
	border=4,
)
qr.add_data(vcard_data)
qr.make(fit=True)

dw_blue = "#005596"
dw_orange = "#f58220"

qr_img = qr.make_image(
	fill_color="white",
	back_color=dw_blue
).convert("RGB")

draw = ImageDraw.Draw(qr_img)
qr_width, qr_height = qr_img.size

# -----------------------------
# 3. Auto-calculate rectangle size based on content
# -----------------------------
padding_top = 24
padding_between_logo_name = 24
padding_between_name_msg = 16
padding_bottom = 24

# Load fonts early to measure
try:
	font_name = ImageFont.truetype("/Library/Fonts/Arial Bold.ttf", 60)
	font_msg = ImageFont.truetype("/Library/Fonts/Arial.ttf", 38)
except:
	font_name = ImageFont.load_default()
	font_msg = ImageFont.load_default()

# Measure text heights
name_text = "Brek Wilkins, Ph.D."
msg_text = "Nice to meet you!"
name_height = font_name.getbbox(name_text)[3]
msg_height = font_msg.getbbox(msg_text)[3]

# Measure logo height
logo = Image.open("img/logo-graph-bigorange-white.png")
logo_max_width = 500
logo_max_height = 180
logo.thumbnail((logo_max_width, logo_max_height), Image.LANCZOS)
logo_height = logo.height

# Total height
rect_height = (
	padding_top +
	logo_height +
	padding_between_logo_name +
	name_height +
	padding_between_name_msg +
	msg_height +
	padding_bottom
)
rect_width = 720
rect_x = (qr_width - rect_width) // 2
rect_y = (qr_height - rect_height) // 2

draw.rectangle([rect_x, rect_y, rect_x + rect_width, rect_y + rect_height], fill=dw_blue)

# -----------------------------
# 4. Adjusted logo for medium box
# -----------------------------
logo = Image.open("img/logo-graph-bigorange-white.png")
logo_max_width = 500
logo_max_height = 180
logo.thumbnail((logo_max_width, logo_max_height), Image.LANCZOS)

logo_x = rect_x + (rect_width - logo.width) // 2
logo_y = rect_y + 24
qr_img.paste(logo, (logo_x, logo_y), mask=logo if logo.mode == 'RGBA' else None)

# -----------------------------
# 5. Adjusted name + message
# -----------------------------
try:
	font_name = ImageFont.truetype("/Library/Fonts/Arial Bold.ttf", 60)
	font_msg = ImageFont.truetype("/Library/Fonts/Arial.ttf", 38)
except:
	font_name = ImageFont.load_default()
	font_msg = ImageFont.load_default()

# Name
name_text = "Brek Wilkins, Ph.D."
name_bbox = draw.textbbox((0, 0), name_text, font=font_name)
name_width = name_bbox[2] - name_bbox[0]
name_height = name_bbox[3] - name_bbox[1]
name_x = rect_x + (rect_width - name_width) // 2
name_y = logo_y + logo.height + 24
draw.text((name_x, name_y), name_text, fill=dw_orange, font=font_name)

# Message
msg_text = "Nice to meet you!"
msg_bbox = draw.textbbox((0, 0), msg_text, font=font_msg)
msg_width = msg_bbox[2] - msg_bbox[0]
msg_x = rect_x + (rect_width - msg_width) // 2
msg_y = name_y + name_height + 16
draw.text((msg_x, msg_y), msg_text, fill=dw_orange, font=font_msg)

# -----------------------------
# 6. Save final images
# -----------------------------
qr_img.save("brek_dataworks_qr_large_center.png")
print("✅ Saved: brek_dataworks_qr_large_center.png")

# Optional: ultra high-res version
final = qr_img.resize((qr_img.width * 2, qr_img.height * 2), resample=Image.NEAREST)
final.save("brek_dataworks_qr_ultra_highres.png")
print("✅ Saved: brek_dataworks_qr_ultra_highres.png")
