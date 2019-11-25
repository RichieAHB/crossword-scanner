/**
 * Location
 *
 * TODO:
 *
 * in the example image (crossword) the sudoku on the right could
 * be a line that is in the crossword, especially given that there
 * is a similar line _below_ the crossword.
 *
 * We can check that the line below spans the whole crossword width
 * (in this case it doesn't). The other thing we can do is check that
 * all squares are either:
 *  - black
 *  - white with no number in it and a black square below
 *  - white with a number in it and a white square below
 *
 * This should work in this instance
 */
