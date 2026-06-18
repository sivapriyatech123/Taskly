const db = require('../db');

exports.createTask = async (req, res) => {
    const { title, description, due_date, priority } = req.body;
    const userId = req.user.id;

    try {
        const result = await db.query(
            'INSERT INTO tasks (title, description, due_date, priority, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, due_date, priority, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date ASC', [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        // Check if task belongs to user
        const task = await db.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
        if (task.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const newStatus = !task.rows[0].is_done;
        const result = await db.query('UPDATE tasks SET is_done = $1 WHERE id = $2 RETURNING *', [newStatus, id]);

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
