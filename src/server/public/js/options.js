

const templateOptions = {
  /**
   * Branch style
   */
  branch: {
    /**
     * Branch line width in pixel
     */
    lineWidth: 1,
    /**
     * Space between branches
     */
    spacing: 9,
    /**
     * Branch label style
     */
    label: {
      /**
       * Branch label visibility
       */
      display: false,
      // /**
      //  * Branch label font
      //  */
      // font: string,
      // /**
      //  * Branch label border radius
      //  */
      // borderRadius: number
    }
  },
  /**
   * Commit style
   */
  commit: {
    /**
     * Spacing between commits
     */
    spacing: 20,
    /**
     * Tooltips policy
     */
    hasTooltipInCompactMode: true,
    /**
     * Commit message style
     */
    message: {
      /**
       * Commit message color
       */
      color: "black",
      /**
       * Commit message display policy
       */
      display: true,
      /**
       * Commit message author display policy
       */
      displayAuthor: false,
      /**
       * Commit message hash display policy
       */
      displayHash: false,
      /**
       * Commit message font
       */
      font: "normal 0.8rem Arial"
    },
    /**
     * Commit dot style
     */
    dot: {
      /**
       * Commit dot size in pixel
       */
      size: 4
    }
  }
  // /**
  //  * Tag style
  //  */
  // tag?: TagStyleOptions;
}

// eslint-disable-next-line no-undef
const template = GitgraphJS.templateExtend("metro", templateOptions)

// eslint-disable-next-line no-unused-vars
const gitGraphOptions = {
  template,
  // orientation?: Orientation;
  // reverseArrow?: boolean;
  // initCommitOffsetX?: number;
  // initCommitOffsetY?: number;
  // mode?: Mode;
  author: "kahmannf <felix@kahmann.de"
  // branchLabelOnEveryCommit?: boolean;
  // commitMessage?: string;
  // generateCommitHash?: () => Commit["hash"];
  // compareBranchesOrder?: CompareBranchesOrder;
}