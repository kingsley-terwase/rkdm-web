import CrudPage from '../components/CrudPage'
import { useSite } from '../context/Site'
export default function BranchesAdmin() {
  const { branches, setBranches } = useSite()
  return <CrudPage title="Branches" perm="content.manage" rows={branches} store={[branches, setBranches]} />
}
