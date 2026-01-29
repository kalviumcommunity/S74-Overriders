type Props = {
  role: 'admin' | 'editor' | 'viewer'
}

export default function UserActions({ role }: Props) {
  return (
    <div>
      <button>View</button>

      {(role === 'admin' || role === 'editor') && (
        <button>Edit</button>
      )}

      {role === 'admin' && (
        <button>Delete</button>
      )}
    </div>
  )
}
