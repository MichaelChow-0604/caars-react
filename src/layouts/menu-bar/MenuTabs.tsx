import { cn } from '@/lib/utils';
import MasterMenuItem from '@/components/MasterMenuItem';
import { IconChevronLeft, IconChevronRight } from '@/lib/icon';

import logo from '@/assets/logo.png';
import logoCollapsed from '@/assets/logo_collapsed.png';

export interface MenuTabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuTabsProps {
  collapsed: boolean;
  onCollapsedChange: (next: boolean) => void;
  items: MenuTabItem[];
  activeNavItem: string;
  onNavItemClick?: (itemId: string) => void;
}

export function MenuTabs({
  collapsed,
  onCollapsedChange,
  items,
  activeNavItem,
  onNavItemClick,
}: MenuTabsProps) {
  return (
    <div className="shrink-0 w-full">
      {collapsed ? (
        <>
          <div className="flex items-center justify-center pt-4 pb-2 w-full">
            <img
              src={logoCollapsed}
              alt="CAARS"
              className="h-[36px] w-[36px] object-contain shrink-0"
            />
          </div>
          <div className="flex items-center justify-center py-2 w-full">
            <button
              type="button"
              onClick={() => onCollapsedChange(false)}
              className="flex items-center justify-center h-[40px] px-3 bg-caars-neutral-grey-3 rounded-[8px] transition-colors hover:bg-caars-neutral-grey-4"
              aria-label="Expand menu"
            >
              <IconChevronRight className="size-5 text-caars-neutral-grey-7" />
            </button>
          </div>
        </>
      ) : (
        <div className="relative flex items-center pl-4 py-4 w-full">
          <img
            src={logo}
            alt="CAARS"
            className="h-[48px] w-auto object-contain shrink-0"
          />
          <button
            type="button"
            onClick={() => onCollapsedChange(true)}
            className="absolute right-0 top-2 flex items-center justify-center h-[53px] px-2 bg-caars-neutral-grey-3 rounded-tl-[12px] rounded-bl-[12px] transition-colors hover:bg-caars-neutral-grey-4"
            aria-label="Collapse menu"
          >
            <IconChevronLeft className="size-5 text-caars-neutral-grey-7" />
          </button>
        </div>
      )}

      <nav className="flex flex-col gap-1.5 py-2 w-full">
        {collapsed
          ? items.map(({ id, label, icon: Icon }) => (
              <CollapsedNavItem
                key={id}
                icon={<Icon className="size-6" />}
                active={activeNavItem === id}
                label={label}
                onClick={() => onNavItemClick?.(id)}
              />
            ))
          : items.map(({ id, label, icon: Icon }) => (
              <MasterMenuItem
                key={id}
                label={label}
                icon={<Icon className="size-6" />}
                active={activeNavItem === id}
                onClick={() => onNavItemClick?.(id)}
                className="w-full"
              />
            ))}
      </nav>
    </div>
  );
}

interface CollapsedNavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  label: string;
  onClick?: () => void;
}

function CollapsedNavItem({
  icon,
  active = false,
  label,
  onClick,
}: CollapsedNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="group flex w-full items-center rounded-[12px]"
    >
      <span
        className={cn(
          'h-[52px] w-1 shrink-0 rounded-tr-[4px] rounded-br-[4px] transition-colors',
          active
            ? 'bg-caars-primary-3'
            : 'bg-caars-neutral-white group-hover:bg-caars-primary-3',
        )}
      />
      <div
        className={cn(
          'flex flex-1 items-center justify-center rounded-[12px] p-3 transition-colors',
          active
            ? 'bg-caars-primary-4'
            : 'bg-caars-neutral-white group-hover:bg-caars-primary-3',
        )}
      >
        <span
          className={cn(
            'size-6 transition-colors',
            active
              ? 'text-caars-primary-3'
              : 'text-caars-neutral-black group-hover:text-caars-neutral-white',
          )}
        >
          {icon}
        </span>
      </div>
    </button>
  );
}

