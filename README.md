# 🏠 Online Publishing Platform (Artcile Publishing app created in Angular)

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

## ✨ Features (Bonus question for tag module attempted)

### 👤 Authentication
- Signup & Login
- Use of OAuthO as authentication framework
- Protected user actions

### 🏡 Article Publishing
- Create articles
- Create tags and assign to article
- View article details 
- Add comments on articles
- Filter articles by tags

### ❤️ Tags
- Add tags to articles
- Search / filter articles by tags

### 🛠 CRUD Operations
- Create new articles/tags
- Edit Article
- Delete Article
- View article details / tags

### 💾 Database Storage Persistence
- Articles
- Tags
- Comments

### 🎨 UI & UX
- Smooth scrolling navigation
- Clean modern UI
- Mobile-friendly layout

---

## 🛠 Tech Stack

- **Frontend Framework:** Angular 20 (Standalone Components)
- **Backend Application:** NodeJS and MongoDB (Atlas)
- **Language:** TypeScript
- **Styling:** CSS3
- **Routing:** Angular Router
- **State Management:** Browser LocalStorage

---

## 📂 Project Structure

src/

├── app/

  ├── core/


    ├── guards/

      ├── auth-guard.ts

      ├── role-guard.ts


    ├── interceptors/

      ├── token-interceptor.ts


    ├── services/

      ├── api.ts

      ├── api.spec.ts

      ├── article.ts

      ├── auth.ts

      ├── author.ts

      ├── comment.ts

      ├── tag.ts



  ├── layout/

    ├── navbar/

  ├── models/

    ├── comment.model.ts


  ├── pages/


    ├── home/

    ├── tags/

    ├── editor/

    ├── authors/

    ├── article-details/


  ├── shared/

    ├── comment-thread/


  ├── environments/

    ├── environment.ts

  ├── app.config.ts

  ├── app.html

  ├── app.routes.ts

  ├── app.scss

  ├── app.ts

  ├── index.html

  ├── main.ts

  ├── styles.scss


---

## ⚙️ Installation & Setup

### Step 1️⃣ Clone Repository

```bash
git clone https://github.com/unaisknagarro/online-publishing-platform-frontend.git

Step 2️⃣ Install Dependencies

npm install

Step 3️⃣ Run Application
Run the backend (NodeJS) application first:
https://github.com/unaisknagarro/online-publishing-platform-backend

npm start

Step 4️⃣ Open in Browser

http://localhost:4200


🔒 Authentication Flow

Signup → Login → OAuth0 → Session stored → Access features


👨‍💻 Author

Name: Unais Kamle
GitHub: https://github.com/unaisknagarro

📜 License

This project is licensed under the MIT License.
