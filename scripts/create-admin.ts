import mongoose from "mongoose";
import Admin from "../src/models/Admin";
import * as readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function question(query: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(query, resolve);
	});
}

async function createAdmin() {
	try {
		const mongoUri =
			process.env.MONGODB_URI || "mongodb://localhost:27017/pts-store";

		console.log("🔌 Подключение к MongoDB...");
		await mongoose.connect(mongoUri);
		console.log("✅ Подключено к MongoDB\n");

		const login = await question("Введите логин админа: ");
		const password = await question("Введите пароль админа: ");

		if (!login || !password) {
			console.error("❌ Логин и пароль обязательны");
			process.exit(1);
		}

		const existingAdmin = await Admin.findOne({ login });

		if (existingAdmin) {
			console.error(`❌ Админ с логином "${login}" уже существует`);
			process.exit(1);
		}

		const admin = await Admin.create({
			login,
			password,
		});

		console.log(`\n✅ Админ успешно создан!`);
		console.log(`Логин: ${admin.login}`);
		console.log(`ID: ${admin._id}\n`);

		process.exit(0);
	} catch (error) {
		console.error("❌ Ошибка при создании админа:", error);
		process.exit(1);
	} finally {
		rl.close();
		await mongoose.connection.close();
	}
}

createAdmin();
