const CategoryList=[
    {id:1,name:"Design",lessons:12},
    {id:2,name:"Development",lessons:8},
    {id:3,name:"Marketing",lessons:5},
    {id:4,name:"Business",lessons:7},
    {id:5,name:"Photography",lessons:4},
    {id:6,name:"Music",lessons:6},
]

export default function CategoriesPage() {  
    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {CategoryList.map(category => (
                    <li key={category.id}>
                        {category.name} - {category.lessons} lessons
                    </li>
                ))}
            </ul>
        </div>
    );
}
