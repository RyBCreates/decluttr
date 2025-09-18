# Decluttr

Decluttr is a **gamified cleaning app** that motivates users to complete real-life tasks and keep their environment clean. By turning chores into achievements, users earn rewards, unlock badges, and progress through levels making cleaning fun and rewarding.

## Tech Stack

### Frontend

- React
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express
- MongoDB

### Tools & Design

- GitHub (Version Control)
- Figma (UI/UX Design)

## Figma Design

You can view the initial design concept here:  
[Decluttr Figma Design](https://www.figma.com/design/Jn0MTvtjpMYgnEQrAkRBqY/Decluttr?node-id=0-1&p=f&t=e3uueE4Lhmkhtrsf-0)

## Live Demo

Check out the deployed version of Decluttr here:  
[Decluttr Live Site](http://www.decluttr.mycityulife.com)

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

git clone https://github.com/your-username/decluttr.git
cd decluttr

### 2. Install Dependencies (Frontend and Backend)

cd (project folder)
npm install

### 3. Configure enviornment variable

Create a .env file in the root folder and add:

MONGO_URI=(your-mongodb-connection-string)
PORT=3000
JWT_SECRET=(your-secret-key)

### 4. Run the app

#### Frontend

Inside the project folder:

npm run dev

#### Backend

Inside the project folder:

npm run seed
npm run dev

## Future Improvements

We plan to continue expanding Decluttr with new content and features:

- More tasks, achievements, and badges

- Level-based rewards (unlock special badges at milestone levels)

- Store upgrades with cosmetics and items that affect user stats

- Daily streaks and seasonal events to boost engagement
