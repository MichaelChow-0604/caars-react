// DOM Inspection Script for Calendar Issue

function getComputedStyleValue(element, property) {
  if (!element) return 'Element not found';
  const computed = window.getComputedStyle(element);
  return computed.getPropertyValue(property);
}

function inspectCalendarDOM() {
  const results = {
    timestamp: new Date().toISOString(),
    findings: {}
  };

  // 1. Find .fc-scrollgrid-section-header
  const headerSection = document.querySelector('.fc-scrollgrid-section-header');
  if (headerSection) {
    const headerScroller = headerSection.querySelector('.fc-scroller');
    results.findings.headerSection = {
      exists: true,
      computedWidth: getComputedStyleValue(headerSection, 'width'),
      offsetWidth: headerSection.offsetWidth,
      clientWidth: headerSection.clientWidth,
      scrollWidth: headerSection.scrollWidth
    };
    
    if (headerScroller) {
      results.findings.headerScroller = {
        exists: true,
        computedPaddingRight: getComputedStyleValue(headerScroller, 'padding-right'),
        inlineStyle: headerScroller.style.paddingRight || 'none',
        offsetWidth: headerScroller.offsetWidth,
        clientWidth: headerScroller.clientWidth
      };
    } else {
      results.findings.headerScroller = { exists: false };
    }
  } else {
    results.findings.headerSection = { exists: false };
  }

  // 2. Find .fc-timegrid-col (resource body column, not axis)
  const timegridCols = document.querySelectorAll('.fc-timegrid-col');
  const timegridCol = Array.from(timegridCols).find(col => !col.closest('.fc-timegrid-axis'));
  
  if (timegridCol) {
    results.findings.timegridCol = {
      exists: true,
      computedBorderRight: getComputedStyleValue(timegridCol, 'border-right'),
      computedBorderRightWidth: getComputedStyleValue(timegridCol, 'border-right-width'),
      computedBorderRightStyle: getComputedStyleValue(timegridCol, 'border-right-style'),
      computedBorderRightColor: getComputedStyleValue(timegridCol, 'border-right-color'),
      inlineStyle: timegridCol.style.borderRight || 'none'
    };
  } else {
    results.findings.timegridCol = { exists: false };
  }

  // 3. Find .fc-col-header-cell (header cell for Dr. Jane Doe)
  const headerCells = document.querySelectorAll('.fc-col-header-cell');
  const headerCell = headerCells[0]; // First doctor
  
  if (headerCell) {
    results.findings.colHeaderCell = {
      exists: true,
      text: headerCell.textContent.trim().substring(0, 50),
      computedBorderRight: getComputedStyleValue(headerCell, 'border-right'),
      computedBorderRightWidth: getComputedStyleValue(headerCell, 'border-right-width'),
      computedBorderRightStyle: getComputedStyleValue(headerCell, 'border-right-style'),
      computedBorderRightColor: getComputedStyleValue(headerCell, 'border-right-color'),
      inlineStyle: headerCell.style.borderRight || 'none'
    };
  } else {
    results.findings.colHeaderCell = { exists: false };
  }

  // 4. Find .fc-scrollgrid
  const scrollgrid = document.querySelector('.fc-scrollgrid');
  if (scrollgrid) {
    results.findings.scrollgrid = {
      exists: true,
      computedBorderCollapse: getComputedStyleValue(scrollgrid, 'border-collapse'),
      computedBorderRight: getComputedStyleValue(scrollgrid, 'border-right'),
      computedBorderRightWidth: getComputedStyleValue(scrollgrid, 'border-right-width'),
      computedBorderRightStyle: getComputedStyleValue(scrollgrid, 'border-right-style'),
      computedBorderRightColor: getComputedStyleValue(scrollgrid, 'border-right-color')
    };
  } else {
    results.findings.scrollgrid = { exists: false };
  }

  // 5. Get CSS rules for last timegrid column
  if (timegridCol) {
    const matchedRules = [];
    const sheets = Array.from(document.styleSheets);
    
    for (const sheet of sheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule.style && rule.selectorText) {
            try {
              if (timegridCol.matches(rule.selectorText)) {
                if (rule.style.borderRight || 
                    rule.style.borderRightWidth || 
                    rule.style.borderRightStyle || 
                    rule.style.borderRightColor) {
                  matchedRules.push({
                    selector: rule.selectorText,
                    borderRight: rule.style.borderRight || '',
                    borderRightWidth: rule.style.borderRightWidth || '',
                    borderRightStyle: rule.style.borderRightStyle || '',
                    borderRightColor: rule.style.borderRightColor || '',
                    stylesheet: sheet.href || 'inline'
                  });
                }
              }
            } catch (e) {
              // Invalid selector, skip
            }
          }
        }
      } catch (e) {
        // CORS or other error, skip
      }
    }
    
    results.findings.cssRulesForTimegridCol = matchedRules;
  }

  // Additional: Check last column specifically
  const lastTimegridCol = document.querySelector('.fc-timegrid-col:last-child');
  if (lastTimegridCol) {
    results.findings.lastTimegridCol = {
      exists: true,
      computedBorderRight: getComputedStyleValue(lastTimegridCol, 'border-right'),
      computedBorderRightWidth: getComputedStyleValue(lastTimegridCol, 'border-right-width'),
      computedBorderRightStyle: getComputedStyleValue(lastTimegridCol, 'border-right-style'),
      computedBorderRightColor: getComputedStyleValue(lastTimegridCol, 'border-right-color')
    };
  }

  return results;
}

// Execute and output results
const results = inspectCalendarDOM();
console.log('=== CALENDAR DOM INSPECTION RESULTS ===');
console.log(JSON.stringify(results, null, 2));
