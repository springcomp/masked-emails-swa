﻿using MaskedEmails.Services.Interop;
using MaskedEmails.Services.Storage.QueueRequests;
using System.Threading.Tasks;

namespace MaskedEmails.Services
{
    internal static class MaskedEmailCommandServiceExtensions
    {
        public static async Task CreateMaskedEmailAsync(this IMaskedEmailCommandService service
            , string address
            , string forwardTo
            , string passwordHash
            , bool forwardingEnabled = true)
        {
            var addCommand = new CreateMaskedEmailCommand
            {
                Address = address,
                AlternateAddress = forwardTo,
                PasswordHash = passwordHash,
            };
            await service.QueueCommandAsync(addCommand);

            if (!forwardingEnabled)
                await service.DisableMaskedEmailAsync(address);
        }

        public static async Task EnableMaskedEmailAsync(this IMaskedEmailCommandService service
            , string address)
        {
            var addCommand = new EnableMaskedEmailCommand
            {
                Address = address,
            };
            await service.QueueCommandAsync(addCommand);
        }
        public static async Task DisableMaskedEmailAsync(this IMaskedEmailCommandService service
            , string address)
        {
            var addCommand = new DisableMaskedEmailCommand
            {
                Address = address,
            };
            await service.QueueCommandAsync(addCommand);
        }
        public static async Task RemoveMaskedEmailAsync(this IMaskedEmailCommandService service
            , string address)
        {
            var addCommand = new RemoveMaskedEmailCommand
            {
                Address = address,
            };
            await service.QueueCommandAsync(addCommand);
        }
        public static async Task ChangeMaskedEmailPassword(this IMaskedEmailCommandService service
            , string address
            , string passwordHash)
        {
            var changePasswordCommand = new ChangeMaskedEmailPasswordCommand
            {
                Address = address,
                PasswordHash = passwordHash,
            };
            await service.QueueCommandAsync(changePasswordCommand);
        }
        public static async Task SendMaskedEmail(this IMaskedEmailCommandService service
            , string sender
            , string address
            , string subject
            , string message)
        {
            var sendCommand = new SendMaskedEmailCommand
            {
                Sender = sender,
                Address = address,
                Subject = subject,
                Message = message,
            };
            await service.QueueCommandAsync(sendCommand);
        }
    }
}