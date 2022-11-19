import React from "react";

export default function TaskLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div>
            <h1>Welcome to Task</h1>
            { children }
        </div>
    )
}