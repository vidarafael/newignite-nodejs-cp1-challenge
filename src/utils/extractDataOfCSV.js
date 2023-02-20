function extractDataOfCSV(text) {
  const lines = text.split('\n');
  let i = 0;
  let header = [];

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('title,')) {
      header = line.split(',');
      break;
    }
    i++;
  }

  const titleCol = header.findIndex(col => col.toLowerCase().includes('title'));
  const descCol = header.findIndex(col => col.toLowerCase().includes('description'));

  if (titleCol < 0 || descCol < 0) {
    throw new Error('As colunas de título e descrição não foram encontradas no arquivo.');
  }

  const tasks = [];
  for (i++; i < lines.length; i++) {
    const values = lines[i].split(',');
    const task = { title: values[titleCol], description: values[descCol] };
    if (task.title && task.description) {
      tasks.push(task);
    }
  }

  return tasks;
}

export { extractDataOfCSV }