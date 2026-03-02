# Quick Start Guide - Reewa Homes with Supabase

## ✅ What's Done

1. **Supabase credentials configured** in `supabase-config.js`
2. **Database schema ready** - Run the SQL in `database-schema.sql`
3. **All files updated** with Supabase integration

## 🚀 Next Steps

### 1. Set Up Database (5 minutes)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/qrwinxzpplhdeuhuwowj
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Open `database-schema.sql` file
5. Copy ALL the content
6. Paste into SQL Editor
7. Click **Run** (or Ctrl+Enter)

You should see: "Success. No rows returned"

### 2. Create Admin Account (2 minutes)

1. In Supabase Dashboard, go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter:
   - Email: your-email@example.com
   - Password: your-secure-password
   - Auto Confirm User: ✓ (check this)
4. Click **Create user**

### 3. Test Your Website

1. Open `index.html` in your browser
2. Click a property and submit an inquiry
3. Go to `login.html`
4. Login with your admin email/password
5. You'll be redirected to `admin.html`
6. You should see:
   - Property management section
   - **Property Inquiries section** with all submitted inquiries

## 📊 What You Can Do Now

### As Admin:
- **Add/Edit/Delete Properties** - All saved to Supabase
- **View All Inquiries** - See name, email, phone, message
- **Update Inquiry Status** - Mark as pending/contacted/closed
- **Manage Property Media** - Add images/videos via URLs

### As Visitor:
- Browse properties
- Submit inquiries (no login required)
- Inquiries saved to database with full contact details

## 🔐 Security Features

- Row Level Security (RLS) enabled
- Only authenticated users can manage properties
- Only authenticated users can view inquiries
- Anyone can submit inquiries (for better user experience)

## 📧 Inquiry Data Captured

For each inquiry, you'll see:
- Property title
- Customer name
- Customer email
- Customer phone
- Inquiry type (general/viewing/purchase/rental)
- Message
- Submission timestamp
- Status (pending/contacted/closed)

## 🎯 Admin Dashboard Features

The admin panel now shows:
1. **Property Management** - Add, edit, delete properties
2. **Inquiries Dashboard** - View all customer inquiries with:
   - Contact information (name, email, phone)
   - Property they're interested in
   - Their message
   - Status tracking
   - Direct email/phone links

## 🔄 Next Enhancements (Optional)

- Email notifications when new inquiries arrive
- Export inquiries to CSV
- Analytics dashboard
- Property search/filter in admin
- Bulk property import

## ⚠️ Important Notes

- Keep your Supabase credentials secure
- Don't commit `supabase-config.js` with real credentials to public repos
- Change admin password after first login
- Test inquiry submission before going live

## 🆘 Troubleshooting

**Can't login?**
- Make sure you created a user in Supabase Authentication
- Check browser console for errors

**Inquiries not showing?**
- Check Supabase Dashboard > Table Editor > inquiries table
- Verify SQL schema was run successfully

**Properties not loading?**
- Check browser console for errors
- Verify Supabase credentials in `supabase-config.js`

---

Your website is now fully integrated with Supabase! 🎉
