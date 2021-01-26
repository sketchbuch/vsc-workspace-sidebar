export const getNonce = (chars: string, random: number): string => {
  let text = '';

  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(random * chars.length));
  }

  return text;
};
