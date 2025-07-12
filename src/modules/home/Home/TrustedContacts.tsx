interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  status: 'online' | 'away' | 'offline';
}

interface TrustedContactsProps {
  contacts: TrustedContact[];
}

const statusColors = {
  online: 'text-green-400',
  away: 'text-yellow-400',
  offline: 'text-gray-400'
};

export default function TrustedContacts({ contacts }: TrustedContactsProps) {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium mb-3 text-gray-300">Trusted Contacts</h4>
      <div className="space-y-2">
        {contacts.map(contact => (
          <div key={contact.id} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-300">{contact.name} ({contact.relation})</span>
            <button className={`${statusColors[contact.status]} text-xs capitalize`}>
              {contact.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
