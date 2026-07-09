import { useState, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORY_ITEMS = [
  { label: 'Prompt 工程', anchorId: 'category-prompt' },
  { label: 'AI 绘画', anchorId: 'category-painting' },
  { label: 'AI 视频', anchorId: 'category-video' },
  { label: 'AI 编程', anchorId: 'category-coding' },
  { label: 'AI 办公', anchorId: 'category-office' },
  { label: 'AI Agent', anchorId: 'category-agent' },
  { label: '模型部署', anchorId: 'category-deploy' },
  { label: 'AI 安全', anchorId: 'category-security' },
] as const;

const PATH_ITEMS = [
  { label: '入门新手', anchorId: 'path-beginner' },
  { label: '进阶用户', anchorId: 'path-intermediate' },
  { label: '专业开发者', anchorId: 'path-professional' },
] as const;

const CASE_ITEMS = [
  { label: 'AI 编程助手配置', anchorId: 'case-1' },
  { label: 'AI 绘画创意工作流', anchorId: 'case-2' },
  { label: 'AI 办公自动化', anchorId: 'case-3' },
  { label: 'AI Agent 开发入门', anchorId: 'case-4' },
  { label: '小红书文案生成器', anchorId: 'case-5' },
  { label: '个人 AI 知识库搭建', anchorId: 'case-6' },
] as const;

const RESOURCE_ITEMS = [
  { label: '免费工具 & 资源中心', to: '/resources' },
  { label: '吉他调音器（网页版）', to: '/tuner' },
  { label: '免费抽奖 · 100%中奖', to: '/lottery' },
  { label: '更多资源即将上线', disabled: true },
] as const;

interface NavDropdownProps {
  label: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavDropdown({ label, isActive, children }: NavDropdownProps) {
  return (
    <div className="relative group">
      <button
        type="button"
        className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
          isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
        }`}
      >
        {label}
        <ChevronDown className={`size-3.5 transition-transform duration-200 group-hover:rotate-180 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
        )}
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-card border border-border rounded-xl shadow-lg py-2 min-w-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
}

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

function DropdownItem({ label, onClick }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150 cursor-pointer whitespace-nowrap"
    >
      {label}
    </button>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';
  const isResourceActive = pathname === '/resources' || pathname === '/tuner' || pathname === '/lottery';

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  const scrollToAnchor = useCallback((anchorId: string) => {
    closeMobile();
    if (isHome) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: anchorId } });
    }
  }, [isHome, navigate, closeMobile]);

  const navigateTo = useCallback((to: string) => {
    closeMobile();
    navigate(to);
  }, [navigate, closeMobile]);

  const toggleMobileExpand = useCallback((key: string) => {
    setMobileExpanded(prev => prev === key ? null : key);
  }, []);

  const isAnchorActive = (anchorId: string) => isHome && hash === `#${anchorId}`;
  const isMembershipActive = pathname === '/membership';

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        {/* Logo + 站点名 */}
        <NavLink
          to="/"
          className="flex items-center gap-3 shrink-0 group transition-transform duration-300 hover:-translate-y-0.5"
          aria-label="AI工具指南 - 回到首页"
        >
          <div className="size-9 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-110">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:rotate-6"
            >
              <rect x="11" y="11" width="10" height="10" rx="2.5" fill="white" opacity="0.95" />
              <rect x="14" y="14" width="4" height="4" rx="1" fill="currentColor" className="text-primary" opacity="0.3" />
              <path d="M16 5v6M16 21v6M5 16h6M21 16h6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
              <circle cx="16" cy="5" r="1.8" fill="white" opacity="0.9" />
              <circle cx="16" cy="27" r="1.8" fill="white" opacity="0.9" />
              <circle cx="5" cy="16" r="1.8" fill="white" opacity="0.9" />
              <circle cx="27" cy="16" r="1.8" fill="white" opacity="0.9" />
              <path d="M11 11l-2-2M21 11l2-2M11 21l-2-2M21 21l2 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            </svg>
          </div>
          <span className="text-lg tracking-tight transition-colors duration-300">
            <span className="font-black text-primary">AI</span>
            <span className="font-bold text-foreground transition-colors duration-300 group-hover:text-primary"> Tools Guide</span>
          </span>
        </NavLink>

        {/* 桌面端导航 — hover 下拉菜单 */}
        <nav className="hidden md:flex items-center gap-0">
          {/* 免费资源 */}
          <NavDropdown label="免费资源" isActive={isResourceActive}>
            {RESOURCE_ITEMS.map((item) => (
              'to' in item ? (
                <DropdownItem
                  key={item.label}
                  label={item.label}
                  onClick={() => navigateTo(item.to)}
                />
              ) : (
                <div
                  key={item.label}
                  className="px-4 py-2.5 text-sm text-muted-foreground"
                >
                  {item.label}
                </div>
              )
            ))}
          </NavDropdown>

          {/* 教程分类 */}
          <NavDropdown label="教程分类" isActive={isAnchorActive('categories')}>
            {CATEGORY_ITEMS.map((item) => (
              <DropdownItem
                key={item.label}
                label={item.label}
                onClick={() => scrollToAnchor(item.anchorId)}
              />
            ))}
          </NavDropdown>

          {/* 学习路径 */}
          <NavDropdown label="学习路径" isActive={isAnchorActive('paths')}>
            {PATH_ITEMS.map((item) => (
              <DropdownItem
                key={item.label}
                label={item.label}
                onClick={() => scrollToAnchor(item.anchorId)}
              />
            ))}
          </NavDropdown>

          {/* 实战案例 */}
          <NavDropdown label="实战案例" isActive={isAnchorActive('cases')}>
            {CASE_ITEMS.map((item) => (
              <DropdownItem
                key={item.label}
                label={item.label}
                onClick={() => scrollToAnchor(item.anchorId)}
              />
            ))}
          </NavDropdown>

          {/* 数据统计 — 无下拉 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('stats')}
            className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              isAnchorActive('stats')
                ? 'text-primary'
                : 'text-foreground hover:text-primary'
            }`}
          >
            数据统计
            {isAnchorActive('stats') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
            )}
          </button>

          {/* AI资讯会员按钮 — 静态，仅hover放大 */}
          <div className="ml-4">
            <NavLink
              to="/membership"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 ${
                isMembershipActive
                  ? 'bg-primary text-white'
                  : 'bg-gradient-to-r from-primary to-teal-500 text-white hover:from-primary/90 hover:to-teal-500/90'
              }`}
            >
              <Diamond className="size-3.5" />
              AI资讯会员
            </NavLink>
          </div>
        </nav>

        {/* 移动端汉堡按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* 移动端下拉菜单 */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {/* 免费资源 */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileExpand('resources')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
              >
                免费资源
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileExpanded === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'resources' && (
                <div className="ml-3 mt-1 space-y-0.5">
                  {RESOURCE_ITEMS.map((item) => (
                    'to' in item ? (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => navigateTo(item.to)}
                        className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <div
                        key={item.label}
                        className="px-3 py-2 text-sm text-muted-foreground/60"
                      >
                        {item.label}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* 教程分类 */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileExpand('categories')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
              >
                教程分类
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileExpanded === 'categories' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'categories' && (
                <div className="ml-3 mt-1 space-y-0.5">
                  {CATEGORY_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => scrollToAnchor(item.anchorId)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 学习路径 */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileExpand('paths')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
              >
                学习路径
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileExpanded === 'paths' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'paths' && (
                <div className="ml-3 mt-1 space-y-0.5">
                  {PATH_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => scrollToAnchor(item.anchorId)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 实战案例 */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileExpand('cases')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
              >
                实战案例
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileExpanded === 'cases' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'cases' && (
                <div className="ml-3 mt-1 space-y-0.5">
                  {CASE_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => scrollToAnchor(item.anchorId)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 数据统计 */}
            <button
              type="button"
              onClick={() => scrollToAnchor('stats')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            >
              数据统计
            </button>

            {/* AI资讯会员 */}
            <NavLink
              to="/membership"
              onClick={closeMobile}
              className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Diamond className="size-3.5" />
              AI资讯会员
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
