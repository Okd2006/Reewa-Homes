# Logo Setup Instructions

## How to Add Your Logo

1. **Prepare Your Logo**
   - Save your logo as `logo.png` in the same folder as your website files
   - Recommended size: 200x60 pixels (or similar aspect ratio)
   - Format: PNG with transparent background works best

2. **File Placement**
   - Place `logo.png` in the root directory (same folder as `index.html`)
   - The website will automatically detect and display your logo

3. **Logo Requirements**
   - File name must be exactly: `logo.png`
   - Supported formats: PNG, JPG, JPEG, SVG
   - Keep file size under 500KB for fast loading

## What Happens When You Add the Logo

- Your logo will appear in the navigation bar
- It will replace the text "Reewa Homes" 
- The logo will be automatically sized to fit properly
- It will appear on both the main website and admin panel

## If No Logo is Added

- The website will display "Reewa Homes" as text
- Everything will work perfectly without a logo
- You can add the logo later anytime

## Testing Your Logo

1. Add your `logo.png` file to the website folder
2. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
3. Your logo should appear in the navigation bar

## Troubleshooting

- **Logo not showing?** Check the file name is exactly `logo.png`
- **Logo too big/small?** The CSS will auto-resize, but you can edit the height in `styles.css`
- **Wrong format?** Convert your logo to PNG format

## Custom Logo Sizes

If you need to adjust the logo size, edit this line in `styles.css`:

```css
.logo img {
    height: 40px;  /* Change this value */
    width: auto;
}
```