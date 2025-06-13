
import React, { useState } from 'react';
import { MoreHorizontal, AlertTriangle } from 'lucide-react';
import { Company } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
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

interface CompanyActionsProps {
  company: Company;
  onStatusUpdate?: () => void;
}

export const CompanyActions: React.FC<CompanyActionsProps> = ({ company, onStatusUpdate }) => {
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivateCompany = async () => {
    setIsDeactivating(true);
    
    try {
      // Update the payment_status to 'inactive' in the registrations table
      const { error } = await supabase
        .from('registrations')
        .update({ payment_status: 'inactive' })
        .eq('id', company.id);

      if (error) {
        console.error('Error deactivating company:', error);
        toast({
          title: "Error",
          description: "Failed to deactivate company. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `${company.name} has been deactivated successfully.`,
        });
        
        // Call the callback to refresh the data
        if (onStatusUpdate) {
          onStatusUpdate();
        }
      }
    } catch (error) {
      console.error('Error deactivating company:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeactivating(false);
      setShowDeactivateDialog(false);
    }
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
              disabled={company.status === 'inactive'}
            >
              {company.status === 'inactive' ? 'Already Deactivated' : 'Deactivate company'}
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
              By deactivating {company.name}, the employees won't be able to make reservations anymore in the co-create network. This action can be reversed later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeactivating}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeactivateCompany}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeactivating}
            >
              {isDeactivating ? 'Deactivating...' : 'Deactivate Company'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
