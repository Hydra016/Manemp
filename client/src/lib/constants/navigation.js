import {
	HiOutlineViewGrid,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
    HiUserGroup,
    HiCalendar,
    HiClock,
    HiPlusCircle,
	HiOutlineEye,
	HiUserAdd,
	HiOutlineArchive,
	HiViewGridAdd,
	HiOutlineChatAlt 
} from 'react-icons/hi'


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
    {
		key: 'employees',
		label: 'Employees',
		path: '/employees',
		icon: <HiUserGroup />
	},
    {
		key: 'shifts',
		label: 'Shifts',
		path: '/shifts',
		icon: <HiClock />
	},
    {
		key: 'schedule',
		label: 'Schedule',
		path: '/schedule',
		icon: <HiCalendar />
	},
	{
		key: 'requests',
		label: 'Requests',
		path: '/requests',
		icon: <HiUserAdd />
	},
	{
		key: 'inventory',
		label: 'Inventory',
		path: '/inventory',
		icon: <HiOutlineArchive />
	},

]

export const DASHBOARD_SIDEBAR_EMPLOYEE_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'add_shift',
		label: 'Add Shift',
		path: '/add-shift',
		icon: <HiPlusCircle />
	},
	{
		key: 'view_shifts',
		label: 'View Schedule',
		path: '/schedule',
		icon: <HiOutlineEye />
	},
	{
		key: 'requests',
		label: 'Requests',
		path: '/requests',
		icon: <HiViewGridAdd />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineChatAlt  />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	},
]


