/**
 * Утилита для загрузки изображений из public/images
 * Поддерживает автоматическую проверку разных расширений файлов
 */

/**
 * Получает путь к изображению стиля танца
 * @param {string} styleName - Название стиля
 * @param {string} extension - Расширение файла (по умолчанию 'jpg')
 * @returns {string} Путь к изображению
 */
export const getStyleImagePath = (styleName, extension = 'svg') => {
  const normalizedName = styleName.toLowerCase().replace(/\s+/g, '-');
  // В dev режиме process.env.PUBLIC_URL может быть пустым, используем прямой путь
  // В production он будет установлен автоматически
  const basePath = process.env.PUBLIC_URL || '';
  const path = `${basePath}/images/styles/${normalizedName}.${extension}`;
  
  // Убираем двойные слеши
  return path.replace(/([^:]\/)\/+/g, '$1');
};

/**
 * Получает путь к фотографии преподавателя
 * @param {string} teacherName - Имя преподавателя
 * @param {string} extension - Расширение файла (по умолчанию 'jpg')
 * @returns {string} Путь к изображению
 */
export const getTeacherImagePath = (teacherName, extension = 'svg') => {
  const normalizedName = teacherName.toLowerCase();
  // В dev режиме process.env.PUBLIC_URL может быть пустым, используем прямой путь
  // В production он будет установлен автоматически
  const basePath = process.env.PUBLIC_URL || '';
  const path = `${basePath}/images/teachers/${normalizedName}.${extension}`;
  
  // Убираем двойные слеши
  return path.replace(/([^:]\/)\/+/g, '$1');
};

/**
 * Пытается загрузить изображение с разными расширениями
 * @param {Function} getPath - Функция для получения пути (принимает extension)
 * @param {string[]} extensions - Массив расширений для проверки
 * @returns {Promise<string|null>} Путь к найденному изображению или null
 */
export const tryLoadImage = async (getPath, extensions = ['jpg', 'jpeg', 'png', 'webp']) => {
  for (const ext of extensions) {
    const path = getPath(ext);
    try {
      const exists = await checkImageExists(path);
      if (exists) {
        return path;
      }
    } catch (error) {
      // Продолжаем проверку следующего расширения
      continue;
    }
  }
  return null;
};

/**
 * Проверяет существование изображения по URL
 * @param {string} url - URL изображения
 * @returns {Promise<boolean>} true если изображение существует
 */
const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    // Устанавливаем таймаут для избежания зависания
    setTimeout(() => resolve(false), 2000);
    img.src = url;
  });
};

