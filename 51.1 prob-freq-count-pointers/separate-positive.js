function separatePositive(nums) {
    let i = 0;
    let j = nums.length - 1;
  
    while (i < j) {
      if (nums[i] < 0 && nums[j] > 0) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
        j--;
      } else if (nums[i] > 0) {
        i++;
      } else {
        j--;
      }
    }
  
    return nums;
  }

  module.exports = {separatePositive}