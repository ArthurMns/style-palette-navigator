
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AddEditUserModal from './AddEditUserModal';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Conseiller';
  createdAt: string;
}

const UsersSection = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Sample data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      role: 'Admin',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Laurent',
      email: 'marie.laurent@example.com',
      role: 'Conseiller',
      createdAt: '2024-02-20'
    }
  ]);
  
  const openAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };
  
  const handleSaveUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    if (editingUser) {
      // Edit existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData }
          : user
      );
      setUsers(updatedUsers);
      toast({
        title: "Utilisateur modifié",
        description: `Les informations de ${userData.firstName} ${userData.lastName} ont été mises à jour.`,
      });
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      toast({
        title: "Utilisateur ajouté",
        description: `${userData.firstName} ${userData.lastName} a été ajouté avec succès.`,
      });
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    if (!userToDelete) return;
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userToDelete.firstName} ${userToDelete.lastName} ?`)) {
      setUsers(users.filter(user => user.id !== id));
      toast({
        title: "Utilisateur supprimé",
        description: `L'utilisateur ${userToDelete.firstName} ${userToDelete.lastName} a été supprimé.`,
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des utilisateurs</h2>
        <Button onClick={openAddModal}>
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} onClick={() => openEditModal(user)} className="cursor-pointer hover:bg-gray-50">
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(user.id);
                  }}>
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AddEditUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
};

export default UsersSection;
