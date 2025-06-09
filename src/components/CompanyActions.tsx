
import React, { useState } from 'react';
import { MoreHorizontal, AlertTriangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const CompanyActions: React.FC = () => {
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  const handleDeactivateCompany = () => {
    // Handle deactivation logic here
    console.log('Company deactivated');
    setShowDeactivateDialog(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => setShowDeactivateDialog(true)}
              className="text-red-600 focus:text-red-600"
            >
              Deactivate company
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Deactivate Company
            </AlertDialogTitle>
            <AlertDialogDescription>
              By deactivating this company, the employees won't be able to make reservations anymore in the co-create network. This action can be reversed later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeactivateCompany}
              className="bg-red-600 hover:bg-red-700"
            >
              Deactivate Company
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
