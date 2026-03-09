import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconSignout } from '@/lib/icon';

import type { CurrentUser } from './types';

interface UserCardProps {
  collapsed: boolean;
  currentUser: CurrentUser;
  onSignOut?: () => void;
}

export function UserCard({ collapsed, currentUser, onSignOut }: UserCardProps) {
  return (
    <div className="shrink-0 border-t border-caars-neutral-grey-4 bg-caars-neutral-white">
      {collapsed ? (
        <div className="flex items-center justify-center p-4">
          <button
            type="button"
            onClick={onSignOut}
            className="text-caars-neutral-grey-6 hover:text-caars-neutral-black transition-colors"
            aria-label="Sign out"
          >
            <IconSignout className="size-6" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-4">
          <Avatar size="lg" className="shrink-0">
            {currentUser.avatarUrl ? (
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            ) : null}
            <AvatarFallback className="bg-caars-secondary-4 text-caars-secondary-3 font-semibold text-xs">
              {currentUser.name
                .split(' ')
                .filter((_, i) => i === 1 || i === 2)
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col min-w-0">
            <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-black truncate">
              {currentUser.name}
            </span>
            <span className="font-caars-header text-caars-overline leading-caars-caption font-normal text-caars-neutral-grey-6 truncate">
              {currentUser.role}
            </span>
          </div>

          <button
            type="button"
            onClick={onSignOut}
            className="shrink-0 text-caars-neutral-grey-6 hover:text-caars-neutral-black transition-colors"
            aria-label="Sign out"
          >
            <IconSignout className="size-6" />
          </button>
        </div>
      )}
    </div>
  );
}

