import { v2 as cloudinary } from 'cloudinary';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

//   throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    // 生成 slug
    meal.slug = slugify(meal.title, { lower: true });
    // 處理 instructions，防範 XSS 攻擊
    meal.instructions = xss(meal.instructions);
  
    // 檢查並上傳圖片至 Cloudinary
    const formData = new FormData();
    formData.append('file', meal.image); // 假設 meal.image 是一個 File 物件
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    const data = await uploadResponse.json();
    // 上傳成功後會返回圖片的 URL
    if (data.secure_url) {
      meal.image = data.secure_url; // 將圖片的 URL 儲存到 meal 物件
    } else {
      throw new Error('Image upload failed');
    }
    console.log(data);
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}