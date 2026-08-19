// For this exercise you will be strengthening your page-fu mastery. You will complete the PaginationHelper class, which is a utility class helpful for querying paging information related to an array.

// The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page. The types of values contained within the collection/array are not relevant.

// The following are some examples of how this class is used:

// let helper = new PaginationHelper(["a", "b", "c", "d", "e", "f"], 4)
// helper.pageCount() // should == 2
// helper.itemCount() // should == 6
// helper.pageItemCount(0) // should == 4
// helper.pageItemCount(1) // last page - should == 2
// helper.pageItemCount(2) // should == -1 since the page is invalid

// // pageIndex takes an item index and returns the page that it belongs on
// helper.pageIndex(5) // should == 1 (zero based index)
// helper.pageIndex(2) // should == 0
// helper.pageIndex(20) // should == -1
// helper.pageIndex(-10) // should == -1

export class PaginationHelper {
  public constructor(
    private collection: unknown[],
    private itemsPerPage: number,
  ) {
    // The constructor takes in an array of items and a integer indicating how many
    // items fit within a single page
  }

  public itemCount(): number {
    // returns the number of items within the entire collection
    return this.collection.length;
  }

  public pageCount(): number {
    // returns the number of pages
    const count = Math.ceil(this.collection.length / this.itemsPerPage);
    return count;
  }

  public pageItemCount(pageIndex: number): number {
    // returns the number of items on the current page. page_index is zero based.
    // this method should return -1 for pageIndex values that are out of range
    if (pageIndex < 0 || pageIndex >= this.pageCount()) return -1;
    if (pageIndex === this.pageCount() - 1) {
      const remainder = this.itemCount() % this.itemsPerPage;
      return remainder === 0 ? this.itemsPerPage : remainder;
    }
    return this.itemsPerPage;
  }

  public pageIndex(itemIndex: number): number {
    // determines what page an item is on. Zero based indexes
    // this method should return -1 for itemIndex values that are out of range
    if (itemIndex < 0 || itemIndex >= this.itemCount()) return -1;
    return Math.floor(itemIndex / this.itemsPerPage);
  }
}
const page = new PaginationHelper([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 20);
// console.log(page.pageCount());
// console.log(page.itemCount());
console.log(page.pageItemCount(20));
8;

console.log(10 / 7);
console.log(10 % 7);
