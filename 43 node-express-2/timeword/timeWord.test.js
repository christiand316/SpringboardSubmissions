function calculateTimeWord(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return 'Invalid time format';
  }

  const hoursMap = {
    0: 'twelve', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve'
  }

  const minutesMap = {
    0: 'oh', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty'
  }

  if (hours === 0 && minutes === 0) {
    return'midnight'
  } else if (hours === 12 && minutes === 0) {
    return 'noon'
  }
  
  const adjustedHours = hours % 12 || 12

  if (minutes !== 0) {
    if (minutes < 10) {
      return `${hoursMap[adjustedHours]} ${minutesMap[0]} ${minutesMap[minutes]}`;
    } else if (minutes < 20 || minutes % 10 === 0) {
      return `${hoursMap[adjustedHours]} ${minutesMap[minutes]}`;
    } else {
      const tens = Math.floor(minutes / 10) * 10;
      const ones = minutes % 10;
      return `${hoursMap[adjustedHours]} ${minutesMap[tens]}-${minutesMap[ones]}`;
    }
  }
    else return `${hoursMap[adjustedHours]} o'clock`

}


describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof calculateTimeWord).toBe('function');
  });
});

describe('convertToSpoken', () => {
  test('Converts 12:03 to "twelve oh three"', () => {
    expect(calculateTimeWord('12:03')).toBe('twelve oh three');
  });

  test('Converts 3:56 to "three fifty-six"', () => {
    expect(calculateTimeWord('3:56')).toBe('three fifty-six');
  });

  test('Handles midnight (00:00)', () => {
    expect(calculateTimeWord('00:00')).toBe('midnight');
  });

  test('Handles noon (12:00)', () => {
    expect(calculateTimeWord('12:00')).toBe('noon');
  });

  test('Converts 5:00 to "five o\'clock"', () => {
    expect(calculateTimeWord('5:00')).toBe("five o'clock");
  });

  test('Handles invalid time format', () => {
    expect(calculateTimeWord('25:61')).toBe('Invalid time format');
  });
});