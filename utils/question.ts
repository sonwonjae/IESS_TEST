export const makeSearchKeyword = (keyword: string) => {
  const set = new Set<string>();
  const words = keyword.trim().split(' ');

  for (const word of words) {
    const { length } = word;

    for (let i = 0; i < length; i++) {
      const slide = [];
      for (let j = 0; j < i; j++) {
        slide.push(word[j]);
      }

      for (let j = i; j < length; j++) {
        slide.push(word[j]);
        set.add(slide.join('').trim());
        slide.shift();
      }
    }
  }

  return [...set];
};
