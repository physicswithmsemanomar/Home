# Physics Platform - Navbar System

## Overview
This project now features a unified navigation system across all pages using a shared navbar component.

## Files Structure
- `navbar.html` - Contains the HTML structure for the navigation bar and mobile menu
- `load-navbar.js` - JavaScript file that loads the navbar into all pages dynamically
- `index.html.html` - Main homepage with integrated navbar
- `laws_page.html` - Laws page with integrated navbar

## How It Works
1. Each page includes the `load-navbar.js` script
2. The script fetches `navbar.html` and inserts it into the page
3. The navbar automatically highlights the current page
4. Scroll effects and mobile menu functionality are initialized

## Features
- ✅ Fixed navbar across all pages
- ✅ Mobile-responsive design
- ✅ Scroll effects (shrinks on scroll)
- ✅ Active page highlighting
- ✅ Mobile hamburger menu
- ✅ Language toggle placeholder
- ✅ WhatsApp integration

## Adding New Pages
To add the navbar to a new page:
1. Include the floating equations div: `<div class="floating-equations" id="floatingEqs"></div>`
2. Add the navbar loader script: `<script src="load-navbar.js"></script>`
3. Ensure the page has the same CSS variables and styles

## Customization
- Edit `navbar.html` to modify navigation links
- Update `load-navbar.js` for custom behavior
- Modify CSS in individual pages for styling adjustments