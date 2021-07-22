export const count_repeat = (array) => {
  let counts = {};

  for (let i = 0; i < array.length; i++) {
    if (counts[array[i]]) {
      counts[array[i]] += 1;
    } else {
      counts[array[i]] = 1;
    }
  }
  return counts;
};

export const calculateEverage = (array) => {
  const getCount = count_repeat(array);
  let stars = 0;
  Object.keys(getCount).map((count, index) => {
    switch (count) {
      case "5":
        let star5 = 5 * getCount[count];
        stars += star5;
        return star5;
      case "4":
        let star4 = 4 * getCount[count];
        stars += star4;
        return star4;
      case "3":
        let star3 = 3 * getCount[count];
        stars += star3;
        return star3;
      case "2":
        let star2 = 2 * getCount[count];
        stars += star2;
        return star2;
      case "1":
        return getCount[count];
      case "0":
        return 0;
      default:
        return 0;
    }
  });
  return stars / Object.values(getCount).reduce((a, b) => a + b, 0);
};
