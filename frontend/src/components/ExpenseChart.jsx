import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {

    const categoryData = [];

    expenses.forEach((expense) => {

        const existingCategory = categoryData.find(
            (item) => item.name === expense.category
        );

        if (existingCategory) {
            existingCategory.value += expense.amount;
        } else {
            categoryData.push({
                name: expense.category,
                value: expense.amount,
            });
        }
    });

    const COLORS = [
        "#3b82f6",
        "#ef4444",
        "#22c55e",
        "#f59e0b",
        "#a855f7",
    ];

    return (
        <div className="bg-[#111827] rounded-2xl p-6 mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">
                Expense Analytics
            </h2>

            <div className="w-full h-[350px]">
                <ResponsiveContainer>
                    <PieChart>

                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label
                            cursor={{ fill: "transparent" }}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111827",
                                border: "1px solid #374151",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ExpenseChart;