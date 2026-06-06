import type { Profile, Course, Lesson, Enrollment, LessonProgress, Quiz, QuizAttempt } from './types';

export const DEMO_STUDENT: Profile = {
  id: 'demo-student-1',
  email: 'student@demo.com',
  full_name: 'Alex Johnson',
  role: 'student',
  interests: ['Programming', 'Design'],
  goals: ['Career change', 'Skill upgrade'],
  experience_level: 'intermediate',
  onboarding_completed: true,
  created_at: '2024-01-15T10:00:00Z',
};

export const DEMO_ADMIN: Profile = {
  id: 'demo-admin-1',
  email: 'admin@demo.com',
  full_name: 'Sarah Chen',
  role: 'admin',
  onboarding_completed: true,
  created_at: '2024-01-01T10:00:00Z',
};

export const DEMO_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Python Programming',
    description: 'Start your coding journey with Python — the world\'s most beginner-friendly language. Learn variables, loops, functions, and build your first real programs.',
    thumbnail_color: 'from-blue-500 to-indigo-600',
    category: 'Programming',
    difficulty: 'beginner',
    instructor_name: 'Dr. Marcus Webb',
    total_lessons: 6,
    enrolled_count: 1842,
    duration_hours: 12,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'course-2',
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, and JavaScript from scratch. Build responsive websites and understand the foundations of modern web development.',
    thumbnail_color: 'from-orange-400 to-rose-500',
    category: 'Web Dev',
    difficulty: 'beginner',
    instructor_name: 'Emily Rodriguez',
    total_lessons: 8,
    enrolled_count: 2301,
    duration_hours: 18,
    created_at: '2024-01-12T10:00:00Z',
  },
  {
    id: 'course-3',
    title: 'Data Science with Pandas',
    description: 'Analyze real datasets using Python\'s most powerful data library. Learn data cleaning, visualization, and statistical analysis.',
    thumbnail_color: 'from-emerald-400 to-teal-600',
    category: 'Data Science',
    difficulty: 'intermediate',
    instructor_name: 'Prof. Aisha Patel',
    total_lessons: 7,
    enrolled_count: 987,
    duration_hours: 14,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user-centered design. Master Figma, wireframing, prototyping, and usability testing.',
    thumbnail_color: 'from-violet-500 to-purple-700',
    category: 'Design',
    difficulty: 'beginner',
    instructor_name: 'James Park',
    total_lessons: 5,
    enrolled_count: 1456,
    duration_hours: 10,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 'course-5',
    title: 'JavaScript ES6+ Mastery',
    description: 'Go beyond the basics with modern JavaScript. Arrow functions, destructuring, async/await, modules — write cleaner, faster code.',
    thumbnail_color: 'from-yellow-400 to-amber-500',
    category: 'Web Dev',
    difficulty: 'intermediate',
    instructor_name: 'Emily Rodriguez',
    total_lessons: 6,
    enrolled_count: 1134,
    duration_hours: 11,
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'course-6',
    title: 'Machine Learning Basics',
    description: 'Demystify AI with hands-on machine learning. Linear regression, decision trees, neural networks — explained simply with real projects.',
    thumbnail_color: 'from-pink-500 to-rose-600',
    category: 'AI & ML',
    difficulty: 'advanced',
    instructor_name: 'Prof. Aisha Patel',
    total_lessons: 9,
    enrolled_count: 723,
    duration_hours: 20,
    created_at: '2024-02-10T10:00:00Z',
  },
];

export const DEMO_LESSONS: Record<string, Lesson[]> = {
  'course-1': [
    { id: 'l1-1', course_id: 'course-1', title: 'Welcome & Setup', content_type: 'video', content_url: 'https://www.youtube.com/embed/rfscVS0vtbw', order_index: 1, duration_minutes: 12, has_quiz: false },
    { id: 'l1-2', course_id: 'course-1', title: 'Variables & Data Types', content_type: 'text', content_text: `# Variables & Data Types in Python\n\nPython is dynamically typed, meaning you don't need to declare variable types explicitly.\n\n## Basic Types\n\n\`\`\`python\n# Strings\nname = "Alice"\ngreeting = 'Hello, World!'\n\n# Numbers\nage = 25\npi = 3.14159\n\n# Booleans\nis_active = True\nis_deleted = False\n\n# NoneType\nresult = None\n\`\`\`\n\n## Type Conversion\n\n\`\`\`python\nx = int("42")     # 42\ny = float("3.14") # 3.14\nz = str(100)      # "100"\n\`\`\`\n\n## Checking Types\n\n\`\`\`python\nprint(type(name))   # <class 'str'>\nprint(type(age))    # <class 'int'>\nprint(type(pi))     # <class 'float'>\n\`\`\`\n\n## Practice Exercises\n\n1. Create a variable for your name, age, and whether you own a pet.\n2. Convert the string "100" to an integer and add 50 to it.\n3. Print the type of each variable you created.`, order_index: 2, duration_minutes: 20, has_quiz: true },
    { id: 'l1-3', course_id: 'course-1', title: 'Control Flow & Loops', content_type: 'video', content_url: 'https://www.youtube.com/embed/6iF8Xb7Z3wQ', order_index: 3, duration_minutes: 25, has_quiz: false },
    { id: 'l1-4', course_id: 'course-1', title: 'Functions & Scope', content_type: 'text', content_text: `# Functions in Python\n\nFunctions are reusable blocks of code that perform a specific task.\n\n## Defining Functions\n\n\`\`\`python\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))  # Hello, Alice!\n\`\`\`\n\n## Default Parameters\n\n\`\`\`python\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Bob"))           # Hello, Bob!\nprint(greet("Bob", "Hi"))     # Hi, Bob!\n\`\`\`\n\n## *args and **kwargs\n\n\`\`\`python\ndef sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4))  # 10\n\`\`\``, order_index: 4, duration_minutes: 22, has_quiz: true },
    { id: 'l1-5', course_id: 'course-1', title: 'Lists, Dicts & Tuples', content_type: 'text', content_text: `# Python Data Structures\n\n## Lists\n\n\`\`\`python\nfruits = ["apple", "banana", "cherry"]\nfruits.append("date")\nfruits.remove("banana")\nprint(fruits[0])  # apple\n\`\`\`\n\n## Dictionaries\n\n\`\`\`python\nperson = {"name": "Alice", "age": 30, "city": "NYC"}\nprint(person["name"])        # Alice\nperson["email"] = "a@b.com"  # add new key\n\`\`\`\n\n## Tuples (immutable)\n\n\`\`\`python\ncoords = (40.7128, -74.0060)\nlat, lng = coords  # unpacking\n\`\`\``, order_index: 5, duration_minutes: 18, has_quiz: false },
    { id: 'l1-6', course_id: 'course-1', title: 'Final Project: Build a CLI App', content_type: 'text', content_text: `# Final Project: Todo CLI App\n\nBuild a command-line todo list application using everything you've learned!\n\n## Requirements\n\n1. Add a task\n2. List all tasks\n3. Mark a task as done\n4. Delete a task\n5. Save tasks to a file (bonus)\n\n## Starter Code\n\n\`\`\`python\ntasks = []\n\ndef add_task(title):\n    tasks.append({"title": title, "done": False})\n    print(f"Added: {title}")\n\ndef list_tasks():\n    if not tasks:\n        print("No tasks yet!")\n        return\n    for i, task in enumerate(tasks, 1):\n        status = "✓" if task["done"] else "○"\n        print(f"{i}. [{status}] {task['title']}")\n\n# Continue building...\n\`\`\`\n\n## Submission\n\nComplete the app and submit a link to your GitHub repo.`, order_index: 6, duration_minutes: 45, has_quiz: true },
  ],
  'course-2': [
    { id: 'l2-1', course_id: 'course-2', title: 'HTML Foundations', content_type: 'video', content_url: 'https://www.youtube.com/embed/UB1O30fR-EE', order_index: 1, duration_minutes: 30, has_quiz: false },
    { id: 'l2-2', course_id: 'course-2', title: 'CSS Styling Basics', content_type: 'text', content_text: `# CSS Basics\n\nCSS (Cascading Style Sheets) controls the visual presentation of HTML elements.\n\n## Selectors\n\n\`\`\`css\n/* Element selector */\np { color: #333; }\n\n/* Class selector */\n.card { border-radius: 8px; }\n\n/* ID selector */\n#header { background: #5B5BD6; }\n\n/* Descendant */\n.nav a { color: white; }\n\`\`\`\n\n## The Box Model\n\nEvery element is a box: content → padding → border → margin\n\n\`\`\`css\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #ccc;\n  margin: 10px auto;\n}\n\`\`\`\n\n## Flexbox\n\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}\n\`\`\``, order_index: 2, duration_minutes: 25, has_quiz: true },
    { id: 'l2-3', course_id: 'course-2', title: 'JavaScript Basics', content_type: 'video', content_url: 'https://www.youtube.com/embed/W6NZfCO5SIk', order_index: 3, duration_minutes: 35, has_quiz: false },
    { id: 'l2-4', course_id: 'course-2', title: 'DOM Manipulation', content_type: 'text', content_text: `# DOM Manipulation\n\nThe DOM (Document Object Model) lets JavaScript interact with HTML.\n\n## Selecting Elements\n\n\`\`\`js\nconst btn = document.getElementById('myBtn');\nconst items = document.querySelectorAll('.item');\nconst header = document.querySelector('h1');\n\`\`\`\n\n## Changing Content\n\n\`\`\`js\nheader.textContent = 'New Title';\nheader.innerHTML = '<span>Styled</span> Title';\n\`\`\`\n\n## Event Listeners\n\n\`\`\`js\nbtn.addEventListener('click', () => {\n  console.log('Button clicked!');\n  btn.style.backgroundColor = 'green';\n});\n\`\`\``, order_index: 4, duration_minutes: 28, has_quiz: true },
    { id: 'l2-5', course_id: 'course-2', title: 'Responsive Design', content_type: 'text', content_text: `# Responsive Design\n\nResponsive design ensures your site looks great on all screen sizes.\n\n## Media Queries\n\n\`\`\`css\n/* Mobile first */\n.grid { grid-template-columns: 1fr; }\n\n@media (min-width: 768px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n\`\`\`\n\n## Viewport Meta Tag\n\n\`\`\`html\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\`\`\`\n\n## Fluid Images\n\n\`\`\`css\nimg { max-width: 100%; height: auto; }\n\`\`\``, order_index: 5, duration_minutes: 20, has_quiz: false },
    { id: 'l2-6', course_id: 'course-2', title: 'Fetch API & JSON', content_type: 'text', content_text: `# Fetch API\n\nFetch lets you make HTTP requests from JavaScript.\n\n## Basic GET Request\n\n\`\`\`js\nasync function getUsers() {\n  const response = await fetch('https://api.example.com/users');\n  const data = await response.json();\n  console.log(data);\n}\n\`\`\`\n\n## POST Request\n\n\`\`\`js\nasync function createUser(user) {\n  const res = await fetch('/api/users', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(user),\n  });\n  return res.json();\n}\n\`\`\``, order_index: 6, duration_minutes: 22, has_quiz: true },
    { id: 'l2-7', course_id: 'course-2', title: 'Build a Portfolio Page', content_type: 'text', content_text: `# Portfolio Project\n\nBuild a personal portfolio website using everything you've learned!\n\n## Must Include\n\n1. Header with your name and navigation\n2. About section\n3. Skills grid\n4. Projects section (at least 2 projects)\n5. Contact form\n6. Responsive on mobile\n\n## Bonus Features\n\n- Dark mode toggle\n- Smooth scroll animations\n- GitHub API to pull real project data`, order_index: 7, duration_minutes: 60, has_quiz: false },
    { id: 'l2-8', course_id: 'course-2', title: 'Deployment with GitHub Pages', content_type: 'text', content_text: `# Deploying to GitHub Pages\n\n## Step 1: Create a GitHub Repository\n\n1. Go to github.com\n2. Click "New Repository"\n3. Name it \`your-username.github.io\`\n\n## Step 2: Push Your Code\n\n\`\`\`bash\ngit init\ngit add .\ngit commit -m "Initial commit"\ngit branch -M main\ngit remote add origin https://github.com/username/repo.git\ngit push -u origin main\n\`\`\`\n\n## Step 3: Enable GitHub Pages\n\nGo to Settings → Pages → Source → main branch → Save.\n\nYour site will be live at \`https://username.github.io/repo\` in ~60 seconds!`, order_index: 8, duration_minutes: 15, has_quiz: false },
  ],
  'course-3': [
    { id: 'l3-1', course_id: 'course-3', title: 'Introduction to Pandas', content_type: 'video', content_url: 'https://www.youtube.com/embed/vmEHCJofslg', order_index: 1, duration_minutes: 20, has_quiz: false },
    { id: 'l3-2', course_id: 'course-3', title: 'DataFrames & Series', content_type: 'text', content_text: `# DataFrames & Series\n\nPandas has two main data structures: Series (1D) and DataFrame (2D).\n\n## Creating a DataFrame\n\n\`\`\`python\nimport pandas as pd\n\ndata = {\n    "name": ["Alice", "Bob", "Charlie"],\n    "age": [25, 30, 35],\n    "city": ["NY", "LA", "Chicago"]\n}\n\ndf = pd.DataFrame(data)\nprint(df.head())\n\`\`\`\n\n## Selecting Data\n\n\`\`\`python\n# Column\ndf["name"]\n\n# Row by index\ndf.iloc[0]\n\n# Filter rows\ndf[df["age"] > 28]\n\`\`\``, order_index: 2, duration_minutes: 30, has_quiz: true },
    { id: 'l3-3', course_id: 'course-3', title: 'Data Cleaning', content_type: 'text', content_text: `# Data Cleaning\n\nReal-world data is messy. Learn how to clean it.\n\n## Handle Missing Values\n\n\`\`\`python\n# Detect\ndf.isnull().sum()\n\n# Drop rows with any NaN\ndf.dropna()\n\n# Fill NaN with mean\ndf["age"].fillna(df["age"].mean())\n\`\`\`\n\n## Remove Duplicates\n\n\`\`\`python\ndf.drop_duplicates()\ndf.drop_duplicates(subset=["email"])\n\`\`\`\n\n## Fix Data Types\n\n\`\`\`python\ndf["age"] = df["age"].astype(int)\ndf["date"] = pd.to_datetime(df["date"])\n\`\`\``, order_index: 3, duration_minutes: 25, has_quiz: false },
    { id: 'l3-4', course_id: 'course-3', title: 'Visualization with Matplotlib', content_type: 'video', content_url: 'https://www.youtube.com/embed/3Xc3CA655Y4', order_index: 4, duration_minutes: 35, has_quiz: true },
    { id: 'l3-5', course_id: 'course-3', title: 'Groupby & Aggregation', content_type: 'text', content_text: `# GroupBy & Aggregation\n\n## GroupBy\n\n\`\`\`python\n# Average age by city\ndf.groupby("city")["age"].mean()\n\n# Multiple aggregations\ndf.groupby("category").agg({\n    "revenue": "sum",\n    "orders": "count",\n    "rating": "mean"\n})\n\`\`\`\n\n## Pivot Tables\n\n\`\`\`python\npd.pivot_table(\n    df,\n    values="revenue",\n    index="region",\n    columns="product",\n    aggfunc="sum"\n)\n\`\`\``, order_index: 5, duration_minutes: 28, has_quiz: false },
    { id: 'l3-6', course_id: 'course-3', title: 'Real Dataset Analysis Project', content_type: 'text', content_text: `# Capstone: Analyze a Real Dataset\n\n## Dataset\n\nWe'll analyze the Titanic dataset — one of the most famous in data science.\n\n## Questions to Answer\n\n1. What was the overall survival rate?\n2. Did gender affect survival probability?\n3. How did passenger class (1st/2nd/3rd) influence survival?\n4. What was the age distribution of survivors vs non-survivors?\n5. Which embarkation port had the best survival rate?\n\n## Steps\n\n\`\`\`python\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("titanic.csv")\n\n# Your analysis here...\n\`\`\``, order_index: 6, duration_minutes: 60, has_quiz: true },
    { id: 'l3-7', course_id: 'course-3', title: 'Statistical Analysis', content_type: 'text', content_text: `# Statistical Analysis with Pandas\n\n## Descriptive Statistics\n\n\`\`\`python\ndf.describe()         # count, mean, std, min, quartiles, max\ndf["age"].mean()      # 35.2\ndf["age"].median()    # 34.0\ndf["age"].std()       # 12.4\ndf["age"].skew()      # distribution skewness\n\`\`\`\n\n## Correlation\n\n\`\`\`python\ndf.corr()             # correlation matrix\ndf[["age","salary"]].corr()\n\`\`\`\n\n## Hypothesis Testing (with scipy)\n\n\`\`\`python\nfrom scipy import stats\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\nprint(f"p-value: {p_value:.4f}")\n\`\`\``, order_index: 7, duration_minutes: 30, has_quiz: false },
  ],
  'course-4': [
    { id: 'l4-1', course_id: 'course-4', title: 'Design Thinking Process', content_type: 'video', content_url: 'https://www.youtube.com/embed/gHGN6hs2gZY', order_index: 1, duration_minutes: 18, has_quiz: false },
    { id: 'l4-2', course_id: 'course-4', title: 'User Research & Personas', content_type: 'text', content_text: `# User Research & Personas\n\n## Why Research Matters\n\nDesign without research is just art. User research grounds your decisions in real needs.\n\n## Research Methods\n\n**Qualitative:**\n- User interviews (1:1, 30-60 min)\n- Contextual observation\n- Usability tests\n- Focus groups\n\n**Quantitative:**\n- Surveys (Google Forms, Typeform)\n- Analytics (clicks, scroll depth, time on page)\n- A/B tests\n\n## Creating a Persona\n\nA persona is a fictional but research-based character representing your users:\n\n- **Name & photo:** Makes it feel real\n- **Demographics:** Age, job, tech comfort\n- **Goals:** What they want to accomplish\n- **Frustrations:** What slows them down\n- **Quote:** Their voice in one sentence`, order_index: 2, duration_minutes: 22, has_quiz: true },
    { id: 'l4-3', course_id: 'course-4', title: 'Wireframing in Figma', content_type: 'video', content_url: 'https://www.youtube.com/embed/FTFaQWZBqQ8', order_index: 3, duration_minutes: 40, has_quiz: false },
    { id: 'l4-4', course_id: 'course-4', title: 'Visual Design Principles', content_type: 'text', content_text: `# Visual Design Principles\n\n## 1. Hierarchy\n\nGuide the eye. Big = important. Use size, weight, and color to rank elements.\n\n## 2. Proximity\n\nGroup related items together. White space separates unrelated content.\n\n## 3. Alignment\n\nNothing is placed randomly. Align to a grid (8px grid works well).\n\n## 4. Contrast\n\nEnsure readability. WCAG AA requires 4.5:1 contrast ratio for body text.\n\n## 5. Repetition\n\nConsistency creates trust. Same button style everywhere. Same card radius throughout.\n\n## Typography Scale\n\n\`\`\`\n64px — Hero headline\n40px — Section headline  \n24px — Card title\n18px — Subheading\n16px — Body copy\n14px — Caption / secondary\n12px — Labels / metadata\n\`\`\``, order_index: 4, duration_minutes: 25, has_quiz: true },
    { id: 'l4-5', course_id: 'course-4', title: 'Prototyping & User Testing', content_type: 'text', content_text: `# Prototyping & Testing\n\n## Prototype Fidelity Levels\n\n**Low fidelity (paper / Balsamiq):**\n- Fast to create\n- Great for early concept validation\n- Focus on structure, not visuals\n\n**High fidelity (Figma with real styles):**\n- Feels close to the final product\n- Good for usability testing\n- Stakeholder sign-off\n\n## Running a Usability Test\n\n1. Define 3-5 tasks\n2. Recruit 5 users (Jakob Nielsen's research shows 5 finds ~85% of issues)\n3. Think-aloud protocol: ask them to narrate while they work\n4. Don't help — watch where they struggle\n5. Note pain points and confusion\n\n## Analyzing Results\n\n- Affinity mapping\n- Task completion rates\n- Time-on-task\n- Error rates`, order_index: 5, duration_minutes: 30, has_quiz: false },
  ],
  'course-5': [
    { id: 'l5-1', course_id: 'course-5', title: 'Arrow Functions & this', content_type: 'text', content_text: `# Arrow Functions\n\n## Traditional vs Arrow\n\n\`\`\`js\n// Traditional\nfunction add(a, b) { return a + b; }\n\n// Arrow\nconst add = (a, b) => a + b;\n\n// Single param — no parens needed\nconst double = x => x * 2;\n\n// Multi-line\nconst greet = name => {\n  const msg = \`Hello, \${name}!\`;\n  return msg;\n};\n\`\`\`\n\n## Arrow Functions & this\n\nArrow functions don't have their own \`this\`. They inherit from the enclosing scope.\n\n\`\`\`js\nclass Timer {\n  constructor() {\n    this.count = 0;\n    setInterval(() => {\n      this.count++; // works! 'this' is the Timer instance\n    }, 1000);\n  }\n}\n\`\`\``, order_index: 1, duration_minutes: 20, has_quiz: true },
    { id: 'l5-2', course_id: 'course-5', title: 'Destructuring & Spread', content_type: 'text', content_text: `# Destructuring\n\n## Array Destructuring\n\n\`\`\`js\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(first);  // 1\nconsole.log(rest);   // [3, 4, 5]\n\`\`\`\n\n## Object Destructuring\n\n\`\`\`js\nconst { name, age, city = 'NYC' } = user;\n\n// Rename\nconst { name: userName } = user;\n\n// Nested\nconst { address: { street } } = user;\n\`\`\`\n\n## Spread Operator\n\n\`\`\`js\n// Arrays\nconst merged = [...arr1, ...arr2];\nconst copy = [...original];\n\n// Objects\nconst updated = { ...user, age: 31 };\nconst clone = { ...settings };\n\`\`\``, order_index: 2, duration_minutes: 22, has_quiz: false },
    { id: 'l5-3', course_id: 'course-5', title: 'Promises & Async/Await', content_type: 'video', content_url: 'https://www.youtube.com/embed/PoRJizFvM7s', order_index: 3, duration_minutes: 30, has_quiz: true },
    { id: 'l5-4', course_id: 'course-5', title: 'ES Modules', content_type: 'text', content_text: `# ES Modules\n\n## Named Exports\n\n\`\`\`js\n// math.js\nexport const PI = 3.14159;\nexport function add(a, b) { return a + b; }\nexport class Vector { ... }\n\n// main.js\nimport { PI, add } from './math.js';\nimport { add as sum } from './math.js';\nimport * as Math from './math.js';\n\`\`\`\n\n## Default Export\n\n\`\`\`js\n// component.js\nexport default function Button({ label }) {\n  return <button>{label}</button>;\n}\n\n// usage\nimport Button from './component.js';\n\`\`\`\n\n## Dynamic Import\n\n\`\`\`js\nconst module = await import('./heavy-module.js');\n\`\`\``, order_index: 4, duration_minutes: 18, has_quiz: false },
    { id: 'l5-5', course_id: 'course-5', title: 'Optional Chaining & Nullish', content_type: 'text', content_text: `# Modern Operators\n\n## Optional Chaining (?.)\n\nSafely access nested properties without crashing on null/undefined.\n\n\`\`\`js\n// Without optional chaining\nconst city = user && user.address && user.address.city;\n\n// With optional chaining\nconst city = user?.address?.city;\n\n// Works with methods too\nconst name = user?.getName?.();\n\n// Arrays\nconst first = arr?.[0];\n\`\`\`\n\n## Nullish Coalescing (??)\n\nReturn right side only when left is null or undefined (not 0 or '').\n\n\`\`\`js\nconst port = config.port ?? 3000;\nconst name = user.name ?? 'Anonymous';\n\n// vs || which also catches falsy\nconst count = data.count ?? 0;  // 0 is valid\nconst count2 = data.count || 0; // replaces 0 with 0 anyway, but also ''  \n\`\`\``, order_index: 5, duration_minutes: 15, has_quiz: false },
    { id: 'l5-6', course_id: 'course-5', title: 'Map, Filter, Reduce', content_type: 'text', content_text: `# Array Methods\n\n## map()\n\nTransform each element, returns new array.\n\n\`\`\`js\nconst prices = [10, 25, 50];\nconst withTax = prices.map(p => p * 1.1);\n// [11, 27.5, 55]\n\`\`\`\n\n## filter()\n\nKeep elements where callback returns true.\n\n\`\`\`js\nconst adults = users.filter(u => u.age >= 18);\nconst active = items.filter(i => !i.deleted);\n\`\`\`\n\n## reduce()\n\nAccumulate array into a single value.\n\n\`\`\`js\nconst total = cart.reduce((sum, item) => sum + item.price, 0);\n\nconst byId = users.reduce((map, user) => {\n  map[user.id] = user;\n  return map;\n}, {});\n\`\`\``, order_index: 6, duration_minutes: 25, has_quiz: true },
  ],
  'course-6': [
    { id: 'l6-1', course_id: 'course-6', title: 'What is Machine Learning?', content_type: 'video', content_url: 'https://www.youtube.com/embed/ukzFI9rgwfU', order_index: 1, duration_minutes: 22, has_quiz: false },
    { id: 'l6-2', course_id: 'course-6', title: 'Linear Regression', content_type: 'text', content_text: `# Linear Regression\n\nLinear regression finds the best-fit line through your data.\n\n## Equation\n\n\`y = mx + b\`\n\nWhere:\n- y = prediction\n- x = input feature\n- m = slope (weight)\n- b = intercept (bias)\n\n## With scikit-learn\n\n\`\`\`python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\n\`\`\`\n\n## Evaluation Metrics\n\n- **MAE:** Mean Absolute Error\n- **MSE:** Mean Squared Error\n- **R²:** Coefficient of determination (1.0 = perfect fit)`, order_index: 2, duration_minutes: 35, has_quiz: true },
    { id: 'l6-3', course_id: 'course-6', title: 'Classification & Decision Trees', content_type: 'text', content_text: `# Classification\n\nClassification predicts categories (spam/not spam, cat/dog, etc.).\n\n## Decision Tree\n\nA tree of if-else rules learned from data.\n\n\`\`\`python\nfrom sklearn.tree import DecisionTreeClassifier\n\nclf = DecisionTreeClassifier(max_depth=5)\nclf.fit(X_train, y_train)\naccuracy = clf.score(X_test, y_test)\n\`\`\`\n\n## Confusion Matrix\n\n\`\`\`\n                Predicted No   Predicted Yes\nActual No    [  True Negative   False Positive ]\nActual Yes   [  False Negative  True Positive  ]\n\`\`\`\n\n## Metrics\n\n- **Accuracy:** (TP + TN) / total\n- **Precision:** TP / (TP + FP)\n- **Recall:** TP / (TP + FN)\n- **F1 Score:** harmonic mean of precision & recall`, order_index: 3, duration_minutes: 40, has_quiz: true },
    { id: 'l6-4', course_id: 'course-6', title: 'Neural Networks', content_type: 'video', content_url: 'https://www.youtube.com/embed/aircAruvnKk', order_index: 4, duration_minutes: 45, has_quiz: false },
    { id: 'l6-5', course_id: 'course-6', title: 'Model Evaluation & Overfitting', content_type: 'text', content_text: `# Model Evaluation\n\n## Train/Validation/Test Split\n\n\`\`\`python\n# 60% train, 20% validation, 20% test\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4)\nX_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5)\n\`\`\`\n\n## Overfitting\n\nOverfitting = memorizing the training data instead of learning patterns.\n\nSigns: high training accuracy, low validation accuracy.\n\nFixes:\n- Regularization (L1/L2)\n- Dropout (neural networks)\n- More training data\n- Simpler model\n- Early stopping\n\n## Cross-Validation\n\n\`\`\`python\nfrom sklearn.model_selection import cross_val_score\n\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV Score: {scores.mean():.2f} ± {scores.std():.2f}")\n\`\`\``, order_index: 5, duration_minutes: 30, has_quiz: false },
    { id: 'l6-6', course_id: 'course-6', title: 'Feature Engineering', content_type: 'text', content_text: `# Feature Engineering\n\nFeature engineering transforms raw data into useful model inputs.\n\n## Scaling\n\n\`\`\`python\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler\n\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)\n\`\`\`\n\n## Encoding Categoricals\n\n\`\`\`python\nimport pandas as pd\n\n# One-hot encoding\ndf_encoded = pd.get_dummies(df, columns=["color", "size"])\n\n# Label encoding\nfrom sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ndf["category"] = le.fit_transform(df["category"])\n\`\`\`\n\n## Feature Selection\n\n\`\`\`python\nfrom sklearn.feature_selection import SelectKBest, f_classif\n\nselector = SelectKBest(f_classif, k=10)\nX_selected = selector.fit_transform(X, y)\n\`\`\``, order_index: 6, duration_minutes: 25, has_quiz: false },
    { id: 'l6-7', course_id: 'course-6', title: 'Natural Language Processing', content_type: 'text', content_text: `# NLP Basics\n\n## Text Preprocessing\n\n\`\`\`python\nimport nltk\nfrom nltk.tokenize import word_tokenize\nfrom nltk.corpus import stopwords\n\ntext = "Machine learning is amazing!"\ntokens = word_tokenize(text.lower())\nclean = [t for t in tokens if t not in stopwords.words('english')]\n# ['machine', 'learning', 'amazing', '!']\n\`\`\`\n\n## TF-IDF Vectorization\n\n\`\`\`python\nfrom sklearn.feature_extraction.text import TfidfVectorizer\n\nvec = TfidfVectorizer(max_features=5000)\nX = vec.fit_transform(corpus)\n\`\`\`\n\n## Sentiment Analysis\n\n\`\`\`python\nfrom textblob import TextBlob\n\nblob = TextBlob("I love this product!")\nprint(blob.sentiment.polarity)  # 0.625 (positive)\n\`\`\``, order_index: 7, duration_minutes: 38, has_quiz: true },
    { id: 'l6-8', course_id: 'course-6', title: 'Capstone: Image Classifier', content_type: 'text', content_text: `# Capstone: Build an Image Classifier\n\n## Goal\n\nTrain a CNN to classify handwritten digits (MNIST dataset).\n\n## Using TensorFlow/Keras\n\n\`\`\`python\nimport tensorflow as tf\n\n# Load data\n(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()\nX_train = X_train.reshape(-1, 784) / 255.0\n\n# Build model\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(128, activation='relu'),\n    tf.keras.layers.Dropout(0.2),\n    tf.keras.layers.Dense(10, activation='softmax')\n])\n\nmodel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\nmodel.fit(X_train, y_train, epochs=10, validation_split=0.1)\n\`\`\`\n\n## Expected Result\n\n~98% test accuracy on MNIST.`, order_index: 8, duration_minutes: 90, has_quiz: false },
    { id: 'l6-9', course_id: 'course-6', title: 'Deploying ML Models', content_type: 'text', content_text: `# Deploying ML Models\n\n## Save & Load\n\n\`\`\`python\nimport joblib\n\n# Save\njoblib.dump(model, 'model.pkl')\n\n# Load\nmodel = joblib.load('model.pkl')\n\`\`\`\n\n## FastAPI Serving\n\n\`\`\`python\nfrom fastapi import FastAPI\nimport joblib\n\napp = FastAPI()\nmodel = joblib.load('model.pkl')\n\n@app.post("/predict")\nasync def predict(features: list[float]):\n    prediction = model.predict([features])\n    return {"prediction": int(prediction[0])}\n\`\`\`\n\n## Cloud Options\n\n- **Hugging Face Spaces** (free, easy)\n- **Railway / Render** (simple server hosting)\n- **AWS SageMaker** (enterprise)\n- **Google Vertex AI** (Google cloud)`, order_index: 9, duration_minutes: 35, has_quiz: false },
  ],
};

export const DEMO_ENROLLMENTS: Enrollment[] = [
  { id: 'enr-1', user_id: 'demo-student-1', course_id: 'course-1', enrolled_at: '2024-02-01T10:00:00Z', course: DEMO_COURSES[0] },
  { id: 'enr-2', user_id: 'demo-student-1', course_id: 'course-2', enrolled_at: '2024-02-10T10:00:00Z', course: DEMO_COURSES[1] },
  { id: 'enr-3', user_id: 'demo-student-1', course_id: 'course-4', enrolled_at: '2024-03-01T10:00:00Z', course: DEMO_COURSES[3] },
];

export const DEMO_PROGRESS: LessonProgress[] = [
  { id: 'pr-1', user_id: 'demo-student-1', lesson_id: 'l1-1', completed_at: '2024-02-02T10:00:00Z' },
  { id: 'pr-2', user_id: 'demo-student-1', lesson_id: 'l1-2', completed_at: '2024-02-03T10:00:00Z' },
  { id: 'pr-3', user_id: 'demo-student-1', lesson_id: 'l1-3', completed_at: '2024-02-04T10:00:00Z' },
  { id: 'pr-4', user_id: 'demo-student-1', lesson_id: 'l1-4', completed_at: '2024-02-05T10:00:00Z' },
  { id: 'pr-5', user_id: 'demo-student-1', lesson_id: 'l2-1', completed_at: '2024-02-11T10:00:00Z' },
  { id: 'pr-6', user_id: 'demo-student-1', lesson_id: 'l2-2', completed_at: '2024-02-12T10:00:00Z' },
  { id: 'pr-7', user_id: 'demo-student-1', lesson_id: 'l2-3', completed_at: '2024-02-13T10:00:00Z' },
  { id: 'pr-8', user_id: 'demo-student-1', lesson_id: 'l4-1', completed_at: '2024-03-02T10:00:00Z' },
  { id: 'pr-9', user_id: 'demo-student-1', lesson_id: 'l4-2', completed_at: '2024-03-03T10:00:00Z' },
];

export const DEMO_QUIZZES: Record<string, Quiz> = {
  'l1-2': {
    id: 'q-l1-2',
    lesson_id: 'l1-2',
    title: 'Variables & Data Types Quiz',
    questions: [
      { id: 'qq-1', quiz_id: 'q-l1-2', question: 'Which of the following is the correct way to declare a variable in Python?', options: ['var x = 5', 'x = 5', 'let x = 5', 'int x = 5'], correct_answer: 1, order_index: 1 },
      { id: 'qq-2', quiz_id: 'q-l1-2', question: 'What is the result of type("42")?', options: ['<class \'int\'>', '<class \'str\'>', '<class \'float\'>', 'TypeError'], correct_answer: 1, order_index: 2 },
      { id: 'qq-3', quiz_id: 'q-l1-2', question: 'Which value is NOT a valid Python boolean?', options: ['True', 'False', 'true', 'None'], correct_answer: 2, order_index: 3 },
      { id: 'qq-4', quiz_id: 'q-l1-2', question: 'What does int("3.14") return in Python?', options: ['3', '3.14', 'ValueError', '4'], correct_answer: 2, order_index: 4 },
    ],
  },
  'l1-4': {
    id: 'q-l1-4',
    lesson_id: 'l1-4',
    title: 'Functions & Scope Quiz',
    questions: [
      { id: 'qq-5', quiz_id: 'q-l1-4', question: 'What keyword is used to define a function in Python?', options: ['function', 'def', 'func', 'fn'], correct_answer: 1, order_index: 1 },
      { id: 'qq-6', quiz_id: 'q-l1-4', question: 'What does *args allow in a function?', options: ['Return multiple values', 'Accept any number of positional arguments', 'Accept keyword arguments', 'Define default values'], correct_answer: 1, order_index: 2 },
      { id: 'qq-7', quiz_id: 'q-l1-4', question: 'What is the output of: def f(x=10): return x*2 — when called as f()?', options: ['0', '10', '20', 'Error'], correct_answer: 2, order_index: 3 },
    ],
  },
  'l2-2': {
    id: 'q-l2-2',
    lesson_id: 'l2-2',
    title: 'CSS Basics Quiz',
    questions: [
      { id: 'qq-8', quiz_id: 'q-l2-2', question: 'Which CSS property controls the space inside an element\'s border?', options: ['margin', 'padding', 'spacing', 'gap'], correct_answer: 1, order_index: 1 },
      { id: 'qq-9', quiz_id: 'q-l2-2', question: 'Which selector targets elements with a specific class?', options: ['#myClass', '.myClass', '*myClass', '@myClass'], correct_answer: 1, order_index: 2 },
      { id: 'qq-10', quiz_id: 'q-l2-2', question: 'What does "display: flex" do?', options: ['Hides the element', 'Makes the element a flex container', 'Makes the element float left', 'Adds a shadow'], correct_answer: 1, order_index: 3 },
    ],
  },
  'l4-2': {
    id: 'q-l4-2',
    lesson_id: 'l4-2',
    title: 'User Research Quiz',
    questions: [
      { id: 'qq-11', quiz_id: 'q-l4-2', question: 'According to Jakob Nielsen, how many users are needed to find ~85% of usability issues?', options: ['1', '3', '5', '10'], correct_answer: 2, order_index: 1 },
      { id: 'qq-12', quiz_id: 'q-l4-2', question: 'A persona is best described as:', options: ['A real user you interviewed', 'A fictional character based on research data', 'A survey template', 'An analytics report'], correct_answer: 1, order_index: 2 },
    ],
  },
};

export const DEMO_QUIZ_ATTEMPTS: QuizAttempt[] = [
  { id: 'qa-1', user_id: 'demo-student-1', quiz_id: 'q-l1-2', score: 3, total: 4, answers: [1, 1, 2, 2], completed_at: '2024-02-03T11:00:00Z' },
];

export const DEMO_STUDENTS: Profile[] = [
  { id: 'demo-student-1', email: 'alex@example.com', full_name: 'Alex Johnson', role: 'student', onboarding_completed: true, created_at: '2024-02-01T10:00:00Z' },
  { id: 'demo-student-2', email: 'mia@example.com', full_name: 'Mia Chen', role: 'student', onboarding_completed: true, created_at: '2024-02-05T10:00:00Z' },
  { id: 'demo-student-3', email: 'liam@example.com', full_name: 'Liam Torres', role: 'student', onboarding_completed: true, created_at: '2024-02-10T10:00:00Z' },
  { id: 'demo-student-4', email: 'priya@example.com', full_name: 'Priya Sharma', role: 'student', onboarding_completed: true, created_at: '2024-02-15T10:00:00Z' },
  { id: 'demo-student-5', email: 'noah@example.com', full_name: 'Noah Williams', role: 'student', onboarding_completed: false, created_at: '2024-03-01T10:00:00Z' },
  { id: 'demo-student-6', email: 'sofia@example.com', full_name: 'Sofia Martinez', role: 'student', onboarding_completed: true, created_at: '2024-03-05T10:00:00Z' },
  { id: 'demo-student-7', email: 'james@example.com', full_name: 'James Park', role: 'student', onboarding_completed: true, created_at: '2024-03-10T10:00:00Z' },
  { id: 'demo-student-8', email: 'olivia@example.com', full_name: 'Olivia Brown', role: 'student', onboarding_completed: true, created_at: '2024-03-15T10:00:00Z' },
];

export type { Enrollment };
