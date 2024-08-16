interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const items = [
    {
      label: 'Undangan',
      icon: 'pi pi-plus',
      url: 'undangan',
    },
  ];
  return (
    <aside
      className={`fixed top-0 left-0 z-10 w-[12.6rem] bg-white text-black h-screen pt-14 transition-transform border-r border-gray-200 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`}
    ></aside>
  );
};

export default Sidebar;
