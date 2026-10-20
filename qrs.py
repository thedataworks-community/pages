"""
Simple QR Code Generator
Generates high-quality vCard and Commons QR codes
"""

import qrcode
from PIL import Image

# Brand colors
DW_BLUE = "#005596"

# =========================================================
# GENERATE HIGH-QUALITY QR CODES
# =========================================================

def make_qr(data, filename, fill="white", back=DW_BLUE, size=600):
	"""Generate crisp, high-quality QR code"""
	qr = qrcode.QRCode(
		version=None,  # Auto-size
		error_correction=qrcode.constants.ERROR_CORRECT_H,  # Highest error correction
		box_size=16,   # Large boxes for sharp scanning
		border=2       # Minimal border
	)
	qr.add_data(data)
	qr.make(fit=True)
	
	# Generate QR image
	img = qr.make_image(fill_color=fill, back_color=back).convert("RGB")
	
	# Resize to exact size using high-quality resampling
	img = img.resize((size, size), Image.Resampling.LANCZOS)
	
	# Save with maximum quality
	img.save(filename, quality=100, dpi=(300, 300), optimize=False)
	print(f"✅ Saved: {filename} ({size}x{size}px)")
	return img


print("\n" + "="*60)
print("📱 GENERATING QR CODES")
print("="*60 + "\n")

# =========================================================
# 1. vCard QR Code (Contact Info)
# =========================================================
vcard_data = """BEGIN:VCARD
VERSION:3.0
N:Wilkins;Brek;;;Ph.D.
FN:Brek Wilkins, Ph.D.
ORG:DataWorks
TITLE:Chief Executive Officer
TEL;TYPE=WORK,VOICE:+14056125995
EMAIL:brek@thedataworks.org
URL:https://thedataworks.org
NOTE:Structured Intelligence for Complex Data
END:VCARD"""

make_qr(vcard_data, "vcard_qr.png", size=600)

# =========================================================
# 2. DataWorks Commons QR Code
# =========================================================
make_qr("https://thedataworks.org/commons/", "commons_qr.png", size=600)

print("\n" + "="*60)
print("✨ DONE!")
print("="*60)
print("\nGenerated files:")
print("  • vcard_qr.png - Your contact info")
print("  • commons_qr.png - DataWorks Commons link")
print("\nBoth are 600x600px @ 300 DPI, ready to use!")
print("="*60 + "\n")