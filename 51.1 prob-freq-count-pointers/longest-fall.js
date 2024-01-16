function longestFall(nums) {
    if (nums.length === 0) return 0;
  
    let longestStreak = 1;
    let currentStreak = 1;
  
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
  
    return Math.max(longestStreak, currentStreak);
  }

  module.exports = longestFall;