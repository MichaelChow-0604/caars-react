import { useEffect, useState } from 'react';

interface InspectionResults {
  headerSection: any;
  headerScroller: any;
  timegridCol: any;
  colHeaderCell: any;
  scrollgrid: any;
  lastTimegridCol: any;
  cssRules: any[];
}

export function DOMInspector() {
  const [results, setResults] = useState<InspectionResults | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;

    const timeout = setTimeout(() => {
      runInspection();
    }, 500);

    return () => clearTimeout(timeout);
  }, [show]);

  const runInspection = () => {
    const getComputed = (el: Element | null, prop: string) => {
      if (!el) return 'N/A';
      return window.getComputedStyle(el).getPropertyValue(prop);
    };

    const headerSection = document.querySelector('.fc-scrollgrid-section-header');
    const headerScroller = headerSection?.querySelector('.fc-scroller');
    const timegridCols = document.querySelectorAll('.fc-timegrid-col');
    const timegridCol = Array.from(timegridCols).find(col => !col.closest('.fc-timegrid-axis'));
    const headerCells = document.querySelectorAll('.fc-col-header-cell');
    const firstHeaderCell = headerCells[0];
    const scrollgrid = document.querySelector('.fc-scrollgrid');
    const lastTimegridCol = document.querySelector('.fc-timegrid-col:last-of-type');

    const cssRules: any[] = [];
    if (timegridCol) {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules || [])) {
            if ((rule as CSSStyleRule).style && (rule as CSSStyleRule).selectorText) {
              const styleRule = rule as CSSStyleRule;
              try {
                if (timegridCol.matches(styleRule.selectorText)) {
                  const br = styleRule.style.borderRight || styleRule.style.borderRightWidth;
                  if (br) {
                    cssRules.push({
                      selector: styleRule.selectorText,
                      borderRight: styleRule.style.borderRight,
                      borderRightWidth: styleRule.style.borderRightWidth,
                      href: sheet.href || 'inline'
                    });
                  }
                }
              } catch (e) {}
            }
          }
        } catch (e) {}
      }
    }

    setResults({
      headerSection: {
        exists: !!headerSection,
        computedWidth: getComputed(headerSection, 'width'),
        offsetWidth: (headerSection as HTMLElement)?.offsetWidth || 'N/A',
        clientWidth: (headerSection as HTMLElement)?.clientWidth || 'N/A',
      },
      headerScroller: {
        exists: !!headerScroller,
        computedPaddingRight: getComputed(headerScroller, 'padding-right'),
        inlineStyle: (headerScroller as HTMLElement)?.style.paddingRight || 'none',
        offsetWidth: (headerScroller as HTMLElement)?.offsetWidth || 'N/A',
      },
      timegridCol: {
        exists: !!timegridCol,
        computedBorderRight: getComputed(timegridCol, 'border-right'),
        computedBorderRightWidth: getComputed(timegridCol, 'border-right-width'),
        computedBorderRightStyle: getComputed(timegridCol, 'border-right-style'),
        computedBorderRightColor: getComputed(timegridCol, 'border-right-color'),
      },
      colHeaderCell: {
        exists: !!firstHeaderCell,
        text: firstHeaderCell?.textContent?.substring(0, 50) || 'N/A',
        computedBorderRight: getComputed(firstHeaderCell, 'border-right'),
        computedBorderRightWidth: getComputed(firstHeaderCell, 'border-right-width'),
        computedBorderRightStyle: getComputed(firstHeaderCell, 'border-right-style'),
        computedBorderRightColor: getComputed(firstHeaderCell, 'border-right-color'),
      },
      scrollgrid: {
        exists: !!scrollgrid,
        computedBorderCollapse: getComputed(scrollgrid, 'border-collapse'),
        computedBorderRight: getComputed(scrollgrid, 'border-right'),
      },
      lastTimegridCol: {
        exists: !!lastTimegridCol,
        computedBorderRight: getComputed(lastTimegridCol, 'border-right'),
        computedBorderRightWidth: getComputed(lastTimegridCol, 'border-right-width'),
        computedBorderRightStyle: getComputed(lastTimegridCol, 'border-right-style'),
        computedBorderRightColor: getComputed(lastTimegridCol, 'border-right-color'),
      },
      cssRules,
    });
  };

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
          padding: '10px 20px',
          background: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        Show DOM Inspector
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 9999,
        overflow: 'auto',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>DOM Inspection Results</h1>
          <button
            onClick={() => setShow(false)}
            style={{
              padding: '8px 16px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        {results && (
          <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
            <Section title="1. .fc-scrollgrid-section-header">
              {JSON.stringify(results.headerSection, null, 2)}
            </Section>

            <Section title="2. .fc-scroller (inside header)">
              {JSON.stringify(results.headerScroller, null, 2)}
            </Section>

            <Section title="3. .fc-timegrid-col (body column)">
              {JSON.stringify(results.timegridCol, null, 2)}
            </Section>

            <Section title="4. .fc-col-header-cell (first header)">
              {JSON.stringify(results.colHeaderCell, null, 2)}
            </Section>

            <Section title="5. .fc-scrollgrid">
              {JSON.stringify(results.scrollgrid, null, 2)}
            </Section>

            <Section title="6. Last .fc-timegrid-col">
              {JSON.stringify(results.lastTimegridCol, null, 2)}
            </Section>

            <Section title="7. CSS Rules with border-right">
              {JSON.stringify(results.cssRules, null, 2)}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#2196F3', marginBottom: '10px' }}>{title}</h3>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          overflow: 'auto',
          border: '1px solid #ddd',
        }}
      >
        {children}
      </pre>
    </div>
  );
}
