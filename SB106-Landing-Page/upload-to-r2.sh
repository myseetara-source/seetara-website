#!/bin/bash

# Cloudflare R2 Upload Script
# Make sure wrangler is installed: npm install -g wrangler
# Make sure you're logged in: wrangler login

BUCKET_NAME="seetara-bags"
IMAGES_DIR="./images"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Cloudflare R2 Upload Script${NC}"
echo "================================"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}Error: wrangler is not installed${NC}"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Check if images directory exists
if [ ! -d "$IMAGES_DIR" ]; then
    echo -e "${YELLOW}Creating images directory...${NC}"
    mkdir -p "$IMAGES_DIR"
    echo -e "${YELLOW}Please add your images to the $IMAGES_DIR directory:${NC}"
    echo "  - brown-handbag.jpg"
    echo "  - black-handbag.jpg"
    echo "  - maroon-handbag.jpg"
    echo "  - coffee-handbag.jpg"
    exit 1
fi

# Array of images to upload
images=(
    "brown-handbag.jpg"
    "black-handbag.jpg"
    "maroon-handbag.jpg"
    "coffee-handbag.jpg"
)

# Upload each image
for image in "${images[@]}"; do
    image_path="$IMAGES_DIR/$image"
    
    if [ ! -f "$image_path" ]; then
        echo -e "${RED}Warning: $image not found in $IMAGES_DIR${NC}"
        continue
    fi
    
    echo -e "${YELLOW}Uploading $image...${NC}"
    
    if wrangler r2 object put "$BUCKET_NAME/$image" --file="$image_path"; then
        echo -e "${GREEN}✓ Successfully uploaded $image${NC}"
    else
        echo -e "${RED}✗ Failed to upload $image${NC}"
    fi
    
    echo ""
done

echo -e "${GREEN}Upload complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Get your R2 public URL from Cloudflare dashboard"
echo "2. Update .env file with: VITE_R2_BASE_URL=https://your-account-id.r2.cloudflarestorage.com/$BUCKET_NAME"
echo "3. Restart your dev server: npm run dev"

