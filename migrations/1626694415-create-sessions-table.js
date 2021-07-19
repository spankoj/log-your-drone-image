exports.up = async function up(sql) {
  await sql`
	CREATE TABLE sessions (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		token text,
		expiry_timestamp TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '72 hours',
		user_id INT REFERENCES users(id) ON DELETE CASCADE
		);
`;
};

// This is the description of the REVERSE of the change to the database
exports.down = async function down(sql) {
  await sql`
DROP TABLE sessions
`;
};
