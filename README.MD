# ChurrascoApp 🥩

A React Native application for calculating barbecue quantities with user management and list saving capabilities.

## 📱 Features

- **Barbecue Calculator**: Calculate optimal quantities of meat, drinks, and supplies based on guest count
- **User Authentication**: Secure login and registration system
- **List Management**: Save and manage barbecue calculations
- **Guest Categories**: Different calculations for men, women, and children
- **Persistent Storage**: Secure local storage for user sessions

## 🛠 Tech Stack

### Frontend (React Native)
- **Framework**: Expo 50.0.14
- **Navigation**: React Navigation 6.x
- **Storage**: Expo SecureStore
- **UI Components**: React Native built-in components
- **Icons**: react-native-svg

### Backend (Node.js)
- **Framework**: Express.js 4.19.2
- **Database**: MongoDB with Mongoose 8.4.0
- **Authentication**: bcrypt for password hashing
- **Validation**: mongoose-type-email for email validation

## 🚀 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB instance
- Expo CLI

### Backend Setup
```bash
cd API
npm install
npm start
```

### Frontend Setup
```bash
cd ChurrascoApp
npm install
npx expo start
```

## 📋 Usage

### Barbecue Calculation Formula
- **Meat**: 0.5kg per person (weighted: men=1.0, women=0.75, children=0.67)
- **Sausage**: 0.06kg per person
- **Bread**: 1.5 units per person
- **Beer**: 1L per adult
- **Soda**: 0.75L per adult/2 + children
- **Farofa**: 0.35 packages per person
- **Salt**: 0.15 packages per person
- **Charcoal**: 5kg per person

### App Flow
1. **Login/Register**: Create account or authenticate
2. **Calculate**: Input guest numbers (men, women, children)
3. **Review**: View calculated quantities
4. **Save**: Store calculation with custom name
5. **Manage**: Access saved lists anytime

## 🔌 API Endpoints

### Authentication
```
POST /user          # Register new user
POST /login         # User authentication
GET /users          # List all users
```

### Lists
```
POST /list          # Create new barbecue list
GET /list/:userId   # Get user's saved lists
DELETE /list/:listId # Delete specific list
```

## 📁 Project Structure

```
ChurrascoApp/
├── views/              # Screen components
│   ├── login.js
│   ├── cadastro.js
│   ├── menu.js
│   ├── informarpessoas.js
│   ├── calculofinal.js
│   ├── listassalvas.js
│   ├── exibirlista.js
│   └── sobrenos.js
├── components/         # Reusable components
│   └── sobreButton.js
├── assets/            # Images and icons
└── App.js            # Main application file

API/
├── controllers/       # Business logic
│   ├── userController.js
│   └── listController.js
├── models/           # Database schemas
│   ├── userModel.js
│   └── listModel.js
├── routers/          # Route definitions
│   └── route.js
├── config/           # Database configuration
│   └── db_mongoose.js
└── app.js           # Server entry point
```

## 🔐 Security Features

- Password hashing with bcrypt (salt rounds: 10)
- Secure storage for user sessions
- Email uniqueness validation
- Protected API endpoints

## 🌐 Deployment

- **Backend**: Deployed on Render.com
- **Database**: MongoDB Atlas
- **Frontend**: Expo managed workflow

## 📱 Screenshots

*Add screenshots of key screens here:*
- Login screen
- Calculator interface
- Results display
- Saved lists view

## 🤝 Contributing

This is an academic project for Mobile Development coursework. 

### Development Guidelines
- Follow S.O.L.I.D principles
- Use English for code comments
- Maintain concise explanations

## 📝 License

Academic project - Educational use only

## 👥 Author

Academic project for Mobile Development discipline

---

**Note**: This application was developed as part of an academic curriculum and is intended for educational purposes.