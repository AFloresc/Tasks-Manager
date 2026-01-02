export const initialBoards = [
    {
        id: "b1",
        name: "Design Board",
        icon: "🎨",
        tasks: [
        {
            id: "t1",
            title: "Investigate Framer Motion",
            tags: ["Concept"],
            status: "backlog",
            priority: "low",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t2",
            title: "Implement CRUD operations",
            tags: ["Technical"],
            status: "backlog",
            priority: "critical",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t3",
            title: "Edit tasks",
            tags: ["Technical", "Front-end"],
            status: "inProgress",
            priority: "high",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t4",
            title: "View subset of tasks",
            tags: ["Technical", "Front-end"],
            status: "inProgress",
            priority: "normal",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t5",
            title: "Delete tasks",
            tags: ["Technical", "Front-end"],
            status: "inReview",
            priority: "high",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t6",
            title: "Add tasks",
            tags: ["Technical", "Front-end"],
            status: "inReview",
            priority: "normal",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t7",
            title: "Basic App structure",
            tags: ["Technical", "Front-end"],
            status: "completed",
            priority: "high",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t8",
            title: "Design Todo App",
            tags: ["Design"],
            status: "completed",
            priority: "low",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        ]
    },

    {
        id: "b2",
        name: "Learning Board",
        icon: "📚",
        tasks: [
        {
            id: "t9",
            title: "Learn Zustand",
            tags: ["Technical"],
            status: "backlog",
            priority: "high",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: "t10",
            title: "Practice TypeScript",
            tags: ["Technical"],
            status: "inProgress",
            priority: "normal",
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        ]
    }
];