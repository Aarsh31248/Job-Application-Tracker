// File to add dummy data into website for developement

import connectDB from "../lib/db";
import "@/lib/models";
import { Board, Column, JobApplication } from "@/lib/models";

const USER_ID = "6a4ea822b5fd9e0eec76e032";

const SAMPLE_JOBS = [
  // Wish List
  {
    company: "Tata Consultancy Services",
    position: "Software Developer",
    location: "Bengaluru, Karnataka",
    tags: ["React", "Tailwind", "High Pay"],
    description: "Build modern web apps with React and Tailwind",
    jobUrl: "https://example.com/jobs/1",
    salary: "₹6 LPA - ₹10 LPA",
  },
  {
    company: "Razorpay",
    position: "Front End Developer",
    location: "Bengaluru, Karnataka",
    tags: ["TypeScript", "React", "Next.js"],
    description: "Build payment interfaces with the frontend team",
    jobUrl: "https://example.com/jobs/2",
    salary: "₹8 LPA - ₹14 LPA",
  },
  {
    company: "Zomato",
    position: "QA Engineer",
    location: "Gurugram, Haryana",
    tags: ["CIT", "Appium", "CI/CD"],
    description: "Test mobile and web apps to ensure quality",
    jobUrl: "https://example.com/jobs/3",
    salary: "₹5 LPA - ₹9 LPA",
  },

  // Applied
  {
    company: "Infosys",
    position: "DevOps Engineer",
    location: "Pune, Maharashtra",
    tags: ["promQL", "Full-stack", "Docker"],
    description: "Manage cloud systems and deployment pipelines",
    jobUrl: "https://example.com/jobs/4",
    salary: "₹7 LPA - ₹12 LPA",
  },
  {
    company: "HDFC Bank",
    position: "Mobile Developer",
    location: "Mumbai, Maharashtra",
    tags: ["React Native", "iOS", "Android"],
    description: "Build mobile apps for digital banking services",
    jobUrl: "https://example.com/jobs/5",
    salary: "₹7 LPA - ₹12 LPA",
  },
  {
    company: "PhonePe",
    position: "UI/UX Designer",
    location: "Bengaluru, Karnataka",
    tags: ["Figma", "Design Systems", "User Research"],
    description: "Design simple and intuitive user experiences",
    jobUrl: "https://example.com/jobs/6",
    salary: "₹6 LPA - ₹11 LPA",
  },
  {
    company: "Wipro",
    position: "DevOps Engineer",
    location: "Hyderabad, Telangana",
    tags: ["promQL", "Full-stack", "Docker"],
    description: "Support cloud systems and automate deployments",
    jobUrl: "https://example.com/jobs/7",
    salary: "₹7 LPA - ₹12 LPA",
  },

  // Interviewing
  {
    company: "Webpulse Solution",
    position: "Web Designer",
    location: "New Delhi, Delhi",
    tags: ["Figma", "React", "Bootstrap"],
    description: "Design responsive websites with the dev team",
    jobUrl: "https://example.com/jobs/8",
    salary: "₹3 LPA - ₹6 LPA",
  },
  {
    company: "Flipkart",
    position: "Product Manager",
    location: "Bengaluru, Karnataka",
    tags: ["Product Strategy", "Agile", "Analytics"],
    description: "Plan product strategy and support business growth",
    jobUrl: "https://example.com/jobs/9",
    salary: "₹18 LPA - ₹30 LPA",
  },
  {
    company: "Jio Platforms",
    position: "Mobile Developer",
    location: "Navi Mumbai, Maharashtra",
    tags: ["Flutter", "Dart", "Firebase"],
    description: "Build cross-platform apps with Flutter and Dart",
    jobUrl: "https://example.com/jobs/10",
    salary: "₹7 LPA - ₹13 LPA",
  },

  // Offer
  {
    company: "Zoho Corporation",
    position: "Software Developer",
    location: "Chennai, Tamil Nadu",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    description: "Develop scalable backend services and APIs",
    jobUrl: "https://example.com/jobs/11",
    salary: "₹7 LPA - ₹12 LPA",
  },
  {
    company: "Delhivery",
    position: "UI Designer",
    location: "Gurugram, Haryana",
    tags: ["Figma", "Illustrator"],
    description: "Lead the UX process, and work with dev team",
    jobUrl: "https://example.com/jobs/12",
    salary: "₹5 LPA - ₹9 LPA",
  },

  // Rejected
  {
    company: "Tech Mahindra",
    position: "Associate",
    location: "Noida, Uttar Pradesh",
    tags: ["Scrum", "Agile"],
    description: "Support product planning and project delivery",
    jobUrl: "https://example.com/jobs/13",
    salary: "₹3 LPA - ₹5 LPA",
  },
  {
    company: "Cognizant",
    position: "Web Test Engineer",
    location: "Kolkata, West Bengal",
    tags: ["Testing", "Automation"],
    description: "Test web products and improve software quality",
    jobUrl: "https://example.com/jobs/14",
    salary: "₹4 LPA - ₹7 LPA",
  },
  {
    company: "Swiggy",
    position: "Data Analyst",
    location: "Hyderabad, Telangana",
    tags: ["JavaScript", "Python", "SQL"],
    description: "Analyze user data and provide product insights",
    jobUrl: "https://example.com/jobs/15",
    salary: "₹6 LPA - ₹10 LPA",
  },
];

async function seed() {
  if (!USER_ID) {
    console.error("❌ Error: SEED_USER_ID environment variable is required");
    console.log("Usage: SEED_USER_ID=your-user-id npm run seed");
    process.exit(1);
  }

  try {
    console.log("🌱 Starting seed process...");
    console.log(`📋 Seeding data for user ID: ${USER_ID}`);

    await connectDB();
    console.log("✅ Connected to database");

    // Find the user's board
    let board = await Board.findOne({ userId: USER_ID, name: "Job Hunt" });

    if (!board) {
      console.log("⚠️  Board not found. Creating board...");
      const { initializeUserBoard } = await import("../lib/init-user-board");
      board = await initializeUserBoard(USER_ID);
      console.log("✅ Board created");
    } else {
      console.log("✅ Board found");
    }

    // Get all columns
    const columns = await Column.find({ boardId: board._id }).sort({
      order: 1,
    });
    console.log(`✅ Found ${columns.length} columns`);

    if (columns.length === 0) {
      console.error(
        "❌ No columns found. Please ensure the board has default columns."
      );
      process.exit(1);
    }

    // Map column names to column IDs
    const columnMap: Record<string, string> = {};
    columns.forEach((col) => {
      columnMap[col.name] = col._id.toString();
    });

    // Clear existing job applications for this user
    const existingJobs = await JobApplication.find({ userId: USER_ID });
    if (existingJobs.length > 0) {
      console.log(
        `🗑️  Deleting ${existingJobs.length} existing job applications...`
      );
      await JobApplication.deleteMany({ userId: USER_ID });

      // Clear job applications from columns
      for (const column of columns) {
        column.jobApplications = [];
        await column.save();
      }
    }

    // Distribute jobs across columns
    const jobsByColumn: Record<string, typeof SAMPLE_JOBS> = {
      "Wish List": SAMPLE_JOBS.slice(0, 3),
      Applied: SAMPLE_JOBS.slice(3, 7),
      Interviewing: SAMPLE_JOBS.slice(7, 10),
      Offer: SAMPLE_JOBS.slice(10, 12),
      Rejected: SAMPLE_JOBS.slice(12, 15),
    };

    let totalCreated = 0;

    for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
      const columnId = columnMap[columnName];
      if (!columnId) {
        console.warn(`⚠️  Column "${columnName}" not found, skipping...`);
        continue;
      }

      const column = columns.find((c) => c.name === columnName);
      if (!column) continue;

      for (let i = 0; i < jobs.length; i++) {
        const jobData = jobs[i];
        const jobApplication = await JobApplication.create({
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          tags: jobData.tags,
          description: jobData.description,
          jobUrl: jobData.jobUrl,
          salary: jobData.salary,
          columnId: columnId,
          boardId: board._id,
          userId: USER_ID,
          status: columnName.toLowerCase().replace(" ", "-"),
          order: i,
        });

        column.jobApplications.push(jobApplication._id);
        totalCreated++;
      }

      await column.save();
      console.log(`✅ Added ${jobs.length} jobs to "${columnName}" column`);
    }

    console.log(`\n🎉 Seed completed successfully!`);
    console.log(`📊 Created ${totalCreated} job applications`);
    console.log(`📋 Board: ${board.name}`);
    console.log(`👤 User ID: ${USER_ID}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();