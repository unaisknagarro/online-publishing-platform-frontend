# 🏠 Online Publishing Platform

A modern **Angular-based article publishing platform** that allows users to create / view articles, create and assign tags to articles and also search/filter articles by tags. It also has a commenting system for articles. 

This project demonstrates **Angular routing, authentication using OAuth0, CRUD operations, and responsive UI design.**

---

## 🚀 Live Demo

🔗 **Application URL:**  
https://advanced-assignment-online-publishi.vercel.app


## 🔑 Demo Credentials

Email: demo@user.com
Password: demo123


> You may create your own account using the **Signup page**.

---

## ✨ Features

### 👤 Authentication
- Signup & Login
- Session persistence using localStorage
- Protected user actions

### 🏡 Listings
- View property listings in carousel layout
- View full listing details
- Add comments on listings
- Mark / unmark favourites
- Owner-only edit & delete

### ❤️ Favourites
- Add listings to favourites
- Favourites carousel embedded on Home page

### 🛠 CRUD Operations
- Create new listing
- Edit listing
- Delete listing
- View listing details

### 💾 Local Storage Persistence
- Listings
- Users
- Sessions
- Comments
- Favourites

### 🎨 UI & UX
- Responsive horizontal carousel
- Smooth scrolling navigation
- Clean modern UI
- Mobile-friendly layout

---

## 🛠 Tech Stack

- **Frontend Framework:** Angular (Standalone Components)
- **Language:** TypeScript
- **Styling:** CSS3
- **Routing:** Angular Router
- **State Management:** Browser LocalStorage

---

## 📂 Project Structure

src/
├── app/
│ ├── pages/
│ │ ├── home/
│ │ ├── preview/
│ │ ├── create-listing/
│ │ ├── login/
│ │ └── signup/
│ ├── services/
│ │ ├── auth.service.ts
│ │ └── listing.service.ts
│ ├── app.routes.ts
│ └── app.component.ts
└── main.ts


---

## ⚙️ Installation & Setup

### Step 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

Step 2️⃣ Install Dependencies

npm install

Step 3️⃣ Run Application

ng serve


Step 4️⃣ Open in Browser

http://localhost:4200


🔒 Authentication Flow

Signup → Login → Session stored → Access features


👨‍💻 Author

Name: <Your Name>
GitHub: https://github.com/
<your-username>

📜 License

This project is licensed under the MIT License.
