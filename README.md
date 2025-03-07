# 🏥 Medcare 

## 📌 Overview  
The **Medcare** is a web-based platform designed to streamline hospital operations. It allows users to:  
- **Sign up and log in** securely.  
- **Book doctor appointments** and view appointment history.  
- **Admin dashboard** to manage doctors and appointments.  

The system ensures that only authorized users can access the **admin dashboard**, where doctors can be added, updated, or removed.  

---

## ✨ Features  

✅ **User Authentication** – Secure login and signup functionality.  
✅ **Doctor Appointment Booking** – Patients can schedule appointments.  
✅ **Appointment History** – Users can view past appointments.  
✅ **Admin Dashboard** – Admins can:  
   - Add new doctors  
   - View appointment history  
   - Update doctor details  
   - Remove doctors  
✅ **Access Control** – Only admins with a set email & password can log in to the dashboard.  

---

## 🛠 Technology Stack  

### **Frontend**  
- 🖥 **HTML** – Structuring web pages.  
- 🎨 **Tailwind CSS** – Styling the UI.  
- 📜 **EJS (Embedded JavaScript)** – Dynamic templates for rendering content.  

### **Backend**  
- ⚡ **Node.js** – JavaScript runtime for server-side development.  
- 🚀 **Express.js** – Web framework for handling routes and requests.  
- 🗄 **MongoDB** – NoSQL database for storing users, doctors, and appointments.  

## 🔐 Admin Access  

To access the **admin dashboard**, log in using the following credentials:  

📧 **Email:** `princepatel5598@gmail.com`  
🔑 **Password:** `Prince@123`  

If the credentials match, the user is redirected to the **admin dashboard**, otherwise, they remain on the home page.  
### 🔄 Authentication Logic  

The authentication logic is implemented in the **`index.js`** file specifically in the `POST /login/exist` route set email and password according to you.  
```javascript
if (emailfind.password == req.body.Existpass) {
    if (req.body.ExistEmail == "princepatel5598@gmail.com" && req.body.Existpass == "Prince@123") {
        res.redirect("/dashboard");
    } else {
        res.render("home.ejs", { content: emailfind, result });
    }
}
```

## 🚀 How to Run the Project  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Medcare.git
cd Medcare
```
