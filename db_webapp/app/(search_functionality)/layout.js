import SidebarFilter from '@components/AdvanceSearch/SidebarFilter';

export default function SearchLayout({ 
    children,
 }) {

  return (
    // const Theme = { }
    <section>
        <div className="fixed left-5 top-20 w-1/4">
          <SidebarFilter />
        </div>
        <script type="text/javascript" src="https://unpkg.com/smiles-drawer@2.0.1/dist/smiles-drawer.min.js"></script>
        <script>
          SmiDrawer.apply();
        </script>
        {children}
    </section>
  )
}
