
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.utils import executor

TOKEN = '7823484188:AAHhKI-wYOMgT0_WXkNBgci9IJ3VuuSbHco'

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)
logging.basicConfig(level=logging.INFO)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    keyboard = types.InlineKeyboardMarkup(resize_keyboard=True)
    web_button = types.InlineKeyboardButton("Открыть Web App", web_app=WebAppInfo(url="https://testwebapp-coral.vercel.app/"))
    keyboard.add(web_button)
    await message.answer("Нажмите на кнопку, чтобы открыть мини-приложение", reply_markup=keyboard)

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)
