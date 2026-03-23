const colors = [
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
    '#ef4444', // Red
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f97316', // Orange
];

export const getEmployeeColor = (id: number | string | undefined) => {
    if (!id) return '#94a3b8'; // Slate 400
    const strId = String(id);
    let hash = 0;
    for (let i = 0; i < strId.length; i++) {
        hash = strId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};
