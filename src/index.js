/**
 * main function
 * @param {string} prefix the css selector want to add
 * @param {object | null} options configs
 * @returns {function} return a function
 */
function plugin (prefix, options) {
  options = options || {}

  return function (root) {
    if (!prefix || typeof prefix !== 'string') {
      return
    }

    root.walkRules(function (rule) {
      if (!rule.selectors) {
        return rule
      }

      if (specailTest(rule)) {
        return rule
      }

      rule.selectors = rule.selectors.map(function (selector) {
        if (
          classMatchesTest(selector, options.ignore) ||
          selector.trim().length === 0
        ) {
          return selector
        }
        return prefix.trim() + ' ' + selector
      })
      return rule
    })
  }
}

/**
 * Determine if class passes test
 *
 * @param {string} clss selector
 * @param {string} test reg or string
 * @return {boolean} if class selector
 */
function classMatchesTest (clss, test) {
  if (!test) {
    return false
  }

  clss = clss.trim()

  if (test instanceof RegExp) {
    return test.exec(clss)
  }

  if (Array.isArray(test)) {
    var tests = test

    return tests.some(function (testItem) {
      if (testItem instanceof RegExp) {
        return testItem.exec(clss)
      } else {
        return clss === testItem
      }
    })
  }

  return clss === test
}

/**
 * Determine if the selector couldn't be added namespace
 *
 * @param {object} rule css rule
 * @return {boolean} if the selector couldn't be added namespace
 */
function specailTest (rule) {
  if (rule.parent && rule.parent.name === 'keyframes') {
    return true
  }
  return false
}

module.exports = plugin
