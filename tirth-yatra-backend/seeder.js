require('dotenv').config();
const mongoose = require('mongoose');
const Tirth = require('./src/models/Tirth');
const User = require('./src/models/User');

const sampleTirths = [
  
  {
    "name": "Shikharji",
    "description": "The holiest pilgrimage site for both Digambara and Svetambara Jains, where 20 of the 24 Tirthankaras attained Moksha (liberation). Located on Parasnath Hill, the highest peak in Jharkhand.",
    "city": "Giridih",
    "state": "Jharkhand",
    "address": "Parasnath Hill, Madhuban, Giridih District, Jharkhand 825329",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/e/e4/Shikharji_temples.jpg"],
    "contactNumber": "+91 6532 232234"
  },
  {
    "name": "Palitana",
    "description": "Considered the most sacred tirth by Svetambara Jains, Shatrunjaya Hill features over 860 marble-carved temples. It is the world's only mountain where no one is allowed to stay overnight.",
    "city": "Palitana",
    "state": "Gujarat",
    "address": "Shatrunjaya Hill, Palitana, Bhavnagar District, Gujarat 364270",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/e/ec/Palitana_Temples_Bhavnagar_Gujarat.jpg"],
    "contactNumber": "+91 2848 243313"
  },
  {
    "name": "Dilwara",
    "description": "World-renowned 11th-13th century temples famous for their extraordinary marble carvings and architectural precision. It is a cluster of five magnificent temples located in a lush forest.",
    "city": "Mount Abu",
    "state": "Rajasthan",
    "address": "Delwada, Mount Abu, Rajasthan 307501",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/b/b5/Dilwara_Temple_Ceiling.jpg"],
    "contactNumber": "+91 2974 235124"
  },
  {
    "name": "Ranakpur",
    "description": "A 15th-century masterpiece dedicated to Adinath, featuring 1,444 uniquely carved marble pillars. No two pillars are identical, and the play of light changes the temple's color throughout the day.",
    "city": "Pali",
    "state": "Rajasthan",
    "address": "Desuri Tehsil, Ranakpur, Pali District, Rajasthan 306702",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/2/2a/Ranakpur_Jain_Temple_Interior.jpg"],
    "contactNumber": "+91 2934 285019"
  },
  {
    "name": "Shravanabelagola",
    "description": "Home to the 57-foot monolithic statue of Lord Bahubali (Gommateshwara), carved from a single block of granite in 981 AD. It is the site of the massive Mahamastakabhisheka festival.",
    "city": "Hassan",
    "state": "Karnataka",
    "address": "Vindhyagiri Hill, Shravanabelagola, Karnataka 573135",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/c/c8/Gommateshwara_Statue.jpg"],
    "contactNumber": "+91 81762 57226"
  },
  {
    "name": "Girnar",
    "description": "A sacred mountain where the 22nd Tirthankara, Lord Neminatha, attained Nirvana. The complex contains 16 temples, with the Neminath Temple being the largest and oldest.",
    "city": "Junagadh",
    "state": "Gujarat",
    "address": "Girnar Taleti Road, Junagadh, Gujarat 362001",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/c/c8/Girnar_Jain_temples.jpg"],
    "contactNumber": "+91 285 2611200"
  },
  {
    "name": "Sonagiri",
    "description": "Known as the 'Golden Hill,' this site features 77 white-washed temples scattered across the hills. It is a major center for self-discipline and austerity for Digambara saints.",
    "city": "Datia",
    "state": "Madhya Pradesh",
    "address": "Sonagiri, Datia District, Madhya Pradesh 475685",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/d/d7/Sonagiri_Temples.jpg"],
    "contactNumber": "+91 7522 262222"
  },
  {
    "name": "Pawapuri (Jal Mandir)",
    "description": "The 'Water Temple' marks the spot where Lord Mahavira attained Nirvana. The white marble temple sits in the center of a massive pond filled with red lotuses.",
    "city": "Nalanda",
    "state": "Bihar",
    "address": "Pawapuri, Nalanda District, Bihar 803115",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/3/3d/Jal_Mandir_Pawapuri.jpg"],
    "contactNumber": "+91 6112 262734"
  },
  {
    "name": "Bawangaja",
    "description": "Features a colossal 84-foot monolithic statue of Lord Adinatha, the first Tirthankara, carved into the Satpura range mountainside in the 12th century.",
    "city": "Barwani",
    "state": "Madhya Pradesh",
    "address": "Chulgiri, District Barwani, Madhya Pradesh 451551",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/7/75/Bawangaja_Statue.jpg"],
    "contactNumber": "+91 7290 222084"
  },
  {
    "name": "Lodhruva",
    "description": "An ancient Jain center featuring the 108-hooded Parshvanatha idol. Built from yellow sandstone, the temple is famous for its intricate 'Kalpavriksha' (Tree of Life) stone carvings.",
    "city": "Jaisalmer",
    "state": "Rajasthan",
    "address": "Lodhruva Village, Jaisalmer, Rajasthan 345001",
    "images": ["https://upload.wikimedia.org/wikipedia/commons/f/fe/Lodhruva_Jain_Temple.jpg"],
    "contactNumber": "+91 2992 250165"
  }

];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // 1. Create a default admin if none exists
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
        admin = await User.create({
            name: "Ishan Admin",
            email: "ishan@test.com",
            password: "password123",
            role: "admin"
        });
    }

    // 2. Add admin ID to tirths
    const dataWithAdmin = sampleTirths.map(t => ({ ...t, createdBy: admin._id }));

    // 3. Clear existing and Insert new
    await Tirth.deleteMany();
    await User.deleteMany({ role: 'user' }); 
    
    await Tirth.insertMany(dataWithAdmin);

    console.log(`${sampleTirths.length} Tirths Imported successfully!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();