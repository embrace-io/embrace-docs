import React, {useEffect, useState, useCallback} from 'react';
import OriginalTOCItems from '@theme-original/TOCItems';
import type {Props} from '@theme/TOCItems';

type TOCItem = Props['toc'][number];

function filterHiddenItems(toc: readonly TOCItem[]): TOCItem[] {
  return toc.reduce<TOCItem[]>((acc, item) => {
    const el = document.getElementById(item.id);
    if (el && el.closest('[hidden]')) {
      return acc;
    }
    const filteredChildren = item.children
      ? filterHiddenItems(item.children)
      : [];
    acc.push({...item, children: filteredChildren});
    return acc;
  }, []);
}

function useVisibleTOC(toc: Props['toc']): TOCItem[] {
  const [visibleToc, setVisibleToc] = useState<TOCItem[]>(() => [...toc]);

  const updateFilter = useCallback(() => {
    setVisibleToc(filterHiddenItems(toc));
  }, [toc]);

  useEffect(() => {
    // Initial filter after mount
    updateFilter();

    // Re-filter when tabs change (Docusaurus toggles the hidden attribute)
    const observer = new MutationObserver(updateFilter);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['hidden'],
      subtree: true,
    });

    return () => observer.disconnect();
  }, [updateFilter]);

  return visibleToc;
}

export default function TOCItems(props: Props): React.ReactElement {
  const filteredToc = useVisibleTOC(props.toc);
  return <OriginalTOCItems {...props} toc={filteredToc} />;
}
