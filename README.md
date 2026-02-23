# Reewa Homes - Professional Real Estate Website

*Just me helping my dad create a website for his Real Estate Business*

A modern, responsive real estate website for showcasing properties with an easy-to-use admin panel for property management.

## 🌟 Features

- **🔐 Secure Authentication**: Admin and user login system with role-based access
- **👨‍💼 Admin Panel**: Full property management for authorized users only
- **👥 User Dashboard**: Browse properties and submit inquiries (logged-in users)
- **🏠 Professional Design**: Modern, sleek interface with smooth animations
- **📱 Multiple Media Support**: Add multiple images and videos per property
- **🏷️ Sale/Rent Categories**: Separate sections for properties for sale and rent
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **📧 Inquiry System**: Professional contact forms with email integration
- **🎨 Logo Support**: Automatic logo detection and display
- **🔍 Category Filtering**: Filter by Residential, Commercial, and Plots

## 🚀 Live Demo

Visit the live website: [https://okd2006.github.io/Reewa-Homes/](https://okd2006.github.io/Reewa-Homes/)

## 📱 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Reewa+Homes+Homepage)

### Admin Panel
![Admin Panel](https://via.placeholder.com/800x400/f8f9fa/333333?text=Property+Management+Panel)

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Okd2006/Reewa-Homes.git
cd Reewa-Homes
```

### 2. Add Your Logo (Optional)
- Place your logo as `logo.png` in the root directory
- Recommended size: 200x60 pixels
- The website will automatically detect and display it

### 3. Customize Contact Information
Edit `index.html` and update:
- Phone number (search for "[Your Phone]")
- Email address
- Physical address

### 4. Setup Authentication (IMPORTANT!)
- **⚠️ Change default credentials immediately!**
- Default admin: `admin` / `admin123`
- Default user: `user` / `user123`
- See `security-setup.md` for detailed instructions

### 5. Start Adding Properties
- Login as admin at `yoursite.com/login.html`
- Use the admin panel to add properties with images/videos
- Properties will automatically appear on the main website

## 📁 File Structure

```
Reewa-Homes/
├── index.html              # Main website (public)
├── login.html              # Login page
├── dashboard.html          # User dashboard (authenticated)
├── admin.html              # Admin panel (admin only)
├── styles.css              # All styling
├── script.js               # Main website functionality
├── auth.js                 # Authentication system
├── dashboard.js            # User dashboard functionality
├── admin.js                # Admin panel functionality
├── logo.png                # Your logo (add this)
├── security-setup.md       # Security configuration guide
├── logo-instructions.md    # Logo setup guide
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🎨 Customization

### Colors
Edit `styles.css` to change the color scheme:
- Primary color: `#d4af37` (gold)
- Dark color: `#1a1a1a` (black)
- Background: `#f8f9fa` (light gray)

### Content
- Update company information in `index.html`
- Modify the about section text
- Add your contact details

## 🌐 Deployment Options

### GitHub Pages (Free)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main"
4. Your site will be live at `https://okd2006.github.io/Reewa-Homes`

### Netlify (Free)
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Custom domain support available

### Vercel (Free)
1. Import your GitHub repository to Vercel
2. Automatic deployments
3. Excellent performance optimization

## 📧 Contact Form Setup

The inquiry forms currently use `mailto:` links. For production, consider:
- **Formspree**: Easy form handling service
- **Netlify Forms**: Built-in form processing
- **EmailJS**: Send emails directly from JavaScript

## 🔧 Technical Details

- **Framework**: Vanilla HTML, CSS, JavaScript
- **Storage**: Browser localStorage for property data
- **Responsive**: Mobile-first design approach
- **Performance**: Optimized images and minimal dependencies
- **SEO**: Semantic HTML structure

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help:
1. Check the `logo-instructions.md` for logo setup
2. Review the admin panel guide in `admin.html`
3. Open an issue on GitHub for technical problems

## 🎯 Future Enhancements

- [ ] Backend integration for property storage
- [ ] User authentication for admin panel
- [ ] Advanced search and filtering
- [ ] Property comparison feature
- [ ] Virtual tour integration
- [ ] WhatsApp integration
- [ ] Property favorites system

---

**Built with ❤️ for Reewa Homes**

*Professional real estate solutions made simple*
